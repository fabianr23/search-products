import React from "react";
import CardProduct from "./card-product";

export default function ListProducts(products) {
  const productsList = products.products;
  if (!Object.keys(productsList).length || !productsList.length) {
    return null;
  } else {
    return (
      <div className="results">
        {productsList.map((product) => {
          console.dir(product);
          return <CardProduct product={product} key={product.id} />;
        })}
      </div>
    );
  }
}
