import React from "react";
import "../sass/search.scss";
import getSearchEndpoint from "./search-endpoint";
import getItemsEndpoint from "./items-endpoint";
import getItemsDescriptionEndpoint from "./items-description-endpoint";
import ListProducts from "./list-products";
import SearchBar from "./search-bar";
import PathCategory from "./path-category";
import SingleProduct from "./product-description";
import logoML from "../assets/png/logo-ML.png";
class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      path: [],
      selectedProduct: null,
      renderProductsOnSearch: false,
    };
  }

  fetchSearchQuery = async () => {
    let query = this.state.query;

    if (query.length >= 3) {
      const { response } = await getSearchEndpoint(query);
      await this.setPathCategory(
        response.filters[0]?.values[0]?.path_from_root
      );
      this.setState({
        selectedProduct: null,
        renderProductsOnSearch: true,
      });
    } else {
      this.setState({
        selectedProduct: null,
        renderProductsOnSearch: false,
      });
    }
  };

  searchInputChange = (event) => {
    const query = event?.target?.value;
    if (query) {
      this.setState({
        query,
        renderProductsOnSearch: false,
      });
    } else {
      this.setState({ query, results: [] });
    }
  };

  setPathCategory(path) {
    const arrayPath = [];
    if (path) {
      path.forEach((path) => {
        if (path.name) {
          arrayPath.push(path.name);
        }
      });
    }
    this.setState({ path: arrayPath });
  }

  setSingleProduct = async (event) => {
    const productID = event?.currentTarget?.dataset?.id;
    const { response, error } = await getItemsEndpoint(productID);
    const {
      responseDescription,
      errorDescription,
    } = await getItemsDescriptionEndpoint(productID);

    if (response && !error) {
      const productComplete = { ...response };
      if (responseDescription && !errorDescription) {
        productComplete.item.description = responseDescription.description;
      }
      this.setState({ selectedProduct: productComplete });
    }
  };

  render() {
    const { query, path, selectedProduct, renderProductsOnSearch } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header__header-container">
            <img
              src={logoML}
              className="App-header__logo"
              alt="logo mercadolibre"
            />
            <SearchBar
              searchQuery={query}
              onChangeFunction={this.searchInputChange}
              searchFunction={this.fetchSearchQuery}
            />
          </div>
        </header>
        <section className="path-category">
          <PathCategory path={path} />
        </section>
        {!this.state.selectedProduct && (
          <section className="container-search">
            <ListProducts
              query={query}
              selectProduct={this.setSingleProduct}
              render={renderProductsOnSearch}
            />
          </section>
        )}

        {this.state.selectedProduct && (
          <section className="single-product">
            <SingleProduct product={selectedProduct} />
          </section>
        )}
      </div>
    );
  }
}

export default Search;
