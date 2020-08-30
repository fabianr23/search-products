import React from "react";
import "../sass/search.scss";
import axios from "axios";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: {},
      message: "",
    };

    this.cancel = "";
  }

  fetchSearchQuery = (query) => {
    const searchAPIURl = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;

    if (this.cancel) {
      this.cancel.cancel();
    }

    this.cancel = axios.CancelToken.source();

    axios
      .get(searchAPIURl, {
        cancelToken: this.cancel.token,
      })
      .then((response) => {
        console.dir(response.data);
        const msgResult =
          response?.data?.results?.length > 0
            ? ""
            : "No results found, try with another search please.";
        this.setState({
          results: response.data.results,
          message: msgResult,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            message: "Failed to fetch the data, Please check network",
          });
        }
      });
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
