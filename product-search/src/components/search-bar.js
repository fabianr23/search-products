import React from "react";
import searchIcon from "../assets/png/icon-search.png";
import "../sass/search-bar.scss";

export default function SearchChild(props) {
  const { searchQuery, onChangeFunction, searchFunction } = props;

  return (
    <div className="container-search-bar">
      <label
        className="container-search-bar__search-label"
        htmlFor="search-input"
      >
        <input
          type="text"
          name="query"
          value={searchQuery}
          id="search-input"
          placeholder="Nunca dejes de buscar"
          onChange={onChangeFunction}
        />
      </label>
      <button
        className="container-search-bar__search-button"
        onClick={searchFunction}
      >
        <figure className="container-search-bar__search-icon">
          <img src={searchIcon} alt="boton realizar búsqueda" />
        </figure>
      </button>
    </div>
  );
}
