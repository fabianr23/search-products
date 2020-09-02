import React from "react";
import { Router, Route } from "react-router";
import { createBrowserHistory } from "history";
import "./sass/app.scss";
import Search from "./components/search";
import SingleProduct from "./components/product-description";
import ListProducts from "./components/list-products";

function App() {
  return (
    <div className="App-global">
      <Router history={createBrowserHistory()}>
        <Route exact path="/" component={Search} />
        <Route exact path="/items" component={ListProducts} />
        <Route exact path="/product/:id" component={SingleProduct} />
      </Router>
    </div>
  );
}

export default App;
