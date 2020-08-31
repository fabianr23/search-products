import React from "react";
import "../sass/search.scss";
import getSearchEndpoint from "./search-endpoint";
import ListProducts from "./list-products";
import SearchChild from "./search-bar";
import logoML from "../assets/png/logo-ML.png";
class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: [],
      message: "",
    };
  }

  componentDidMount() {
    this.setListenerSearch();
  }

  fetchSearchQuery = async () => {
    let query = this.state.query;

    if (query.length >= 3) {
      const { response, message } = await getSearchEndpoint(query);
      await this.setProducts(response);
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
    this.setState({ results: resultsFiltered });
    console.dir(this.state);
  }

  render() {
    const { query, results } = this.state;
    console.dir(results);
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header__header-container">
            <img
              src={logoML}
              className="App-header__logo"
              alt="logo mercadolibre"
            />
            <SearchChild
              searchQuery={query}
              onChangeFunction={this.searchInputChange}
              searchFunction={this.fetchSearchQuery}
            />
          </div>
        </header>
        <section className="container-search">
          <ListProducts products={results} />
        </section>
      </div>
    );
  }
}

export default Search;
