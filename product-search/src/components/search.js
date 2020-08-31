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
      results: [],
      message: "",
      path: [],
      selectedProduct: null,
    };
  }

  componentDidMount() {
    this.setListenerSearch();
  }

  fetchSearchQuery = async () => {
    let query = this.state.query;

    if (query.length >= 3) {
      const { response, message } = await getSearchEndpoint(query);
      await this.setProducts(response.results);
      await this.setPathCategory(
        response.filters[0]?.values[0]?.path_from_root
      );
      this.setState({
        message: message,
      });
    } else {
      this.setState({
        results: [],
      });
    }
  };

  searchInputChange = async (event) => {
    const query = event.target.value;
    if (query) {
      await this.setState({ query: query, message: "" });
    } else {
      this.setState({ query, results: [], message: "" });
    }
  };

  setListenerSearch() {
    const inputSearch = document.getElementById("search-input");
    if (inputSearch) {
      inputSearch.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          document
            .querySelector(".container-search-bar__search-button")
            .click();
        }
      });
    }
  }

  setProducts(listProducts) {
    const resultsFiltered = [];
    for (let i = 0; i < 4; i++) {
      if (listProducts[i]) {
        resultsFiltered[i] = listProducts[i];
      }
    }
    this.setState({ results: resultsFiltered, selectedProduct: null });
    console.dir(this.state);
  }

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
        productComplete.description_plain_text = responseDescription.plain_text;
      }
      this.setState({ selectedProduct: productComplete });
    }
  };

  render() {
    const { query, results, path, selectedProduct } = this.state;
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
              products={results}
              selectProduct={this.setSingleProduct}
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
