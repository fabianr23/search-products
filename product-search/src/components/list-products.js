import React from "react";
import CardProduct from "./card-product";
import getSearchEndpoint from "./search-endpoint";

class ListProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      products: [],
    };
  }

  async componentDidMount() {
    this.setListenerSearch();

    if (this.props?.location?.search) {
      const querySearch = this.props.location.search.split("?search=");
      try {
        this.getListProducts(querySearch[1]);
      } catch (err) {
        return null;
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps?.query) {
      this.setState({ query: nextProps.query });
    }
    if (nextProps?.render) {
      this.getListProducts(nextProps.query);
    }
  }

  async getListProducts(query) {
    if (query.length >= 3) {
      const { response } = await getSearchEndpoint(query);
      if (response) {
        this.setProducts(response.results);
      }
    } else {
      this.setProducts([]);
    }
  }

  setProducts(listProducts) {
    const resultsFiltered = [];
    for (let i = 0; i < 4; i++) {
      if (listProducts[i]) {
        resultsFiltered[i] = listProducts[i];
      }
    }
    this.setState({ products: resultsFiltered, selectProduct: () => {} });
  }

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

  render() {
    let { selectProduct } = this.props;
    if (!selectProduct) {
      selectProduct = () => {};
    }
    const products = this.state.products;
    if (!products || !products?.length) {
      return null;
    } else {
      return (
        <div className="results">
          {products.map((product) => {
            return (
              <CardProduct
                product={product}
                selectProduct={selectProduct}
                key={product.id}
              />
            );
          })}
        </div>
      );
    }
  }
}

export default ListProducts;
