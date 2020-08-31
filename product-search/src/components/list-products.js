import React from "react";

export default function ListProducts(products) {
  const productsList = products.products;
  if (!Object.keys(productsList).length || !productsList.length) {
    return null;
  } else {
    return (
      <div className="results">
        {productsList.map((product) => {
          return (
            <div key={product.id}>
              <a href="/" className="card-product">
                {product.title}
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}
