import React from "react";
import "../sass/search.scss";
import getSearchEndpoint from "./search-endpoint";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: [],
      message: "",
    };
  }

  fetchSearchQuery = async (query) => {
    if (query.length >= 3) {
      const { response, message } = await getSearchEndpoint(query);

      this.setState({
        results: response,
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
      await this.fetchSearchQuery(query);
    } else {
      this.setState({ query, results: {}, message: "" });
    }
  };

  showResults = () => {
    const { results } = this.state;
    if (Object.keys(results).length && results.length) {
      return (
        <div className="results">
          {results.map((result) => {
            return (
              <a key={result.id} href="/" className="card-product">
                {result.title}
              </a>
            );
          })}
        </div>
      );
    }
  };

  render() {
    const { query } = this.state;
    return (
      <div className="container-search">
        <label
          className="container-search__search-label"
          htmlFor="search-input"
        >
          <input
            type="text"
            name="query"
            value={query}
            id="search-input"
            placeholder="Nunca dejes de buscar"
            onChange={this.searchInputChange}
          />
        </label>
        {this.showResults()}
      </div>
    );
  }
}

export default Search;
