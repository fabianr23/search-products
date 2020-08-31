import React from "react";
import CardProduct from "./card-product";

export default function ListProducts(props) {
  const { products, selectProduct } = props;
  const productsList = products;
  if (!Object.keys(productsList).length || !productsList.length) {
    return null;
  } else {
    return (
      <div className="results">
        {productsList.map((product) => {
          return (
            <div
              onClick={selectProduct.bind(this)}
              key={product.id}
              data-id={product.id}
            >
              <CardProduct product={product} />
            </div>
          );
        })}
      </div>
    );
  }
}
