import React from "react";
import logo from "./assets/png/logo-ML.png";
import "./sass/app.scss";
import Search from "./components/search";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header__header-container">
          <img
            src={logo}
            className="App-header__logo"
            alt="logo mercadolibre"
          />
          <Search />
        </div>
      </header>
    </div>
  );
}

export default App;
