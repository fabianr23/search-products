import React from "react";
import iconShipping from "../assets/png/icon-shipping.png";
import "../sass/card-product.scss";

export default function CardProduct(productObject) {
  const product = productObject.product;
  return (
    <section className="card-product">
      <div className="card-product__product-info">
        <figure className="card-product__thumbnail">
          <img src={product.thumbnail} alt={product.title} />
        </figure>
        <div className="card-product__product-description">
          <div className="product-description__price-shipping">
            <span className="product-description__price">${product.price}</span>
            {product?.shipping?.free_shiping ? (
              <figure>
                <img
                  src={iconShipping}
                  alt="Este producto tiene free shipping"
                />
              </figure>
            ) : null}
          </div>
          <p className="product-description__text">{product.title}</p>
        </div>
      </div>
      <div className="card-product__product-location">
        <p>{product?.address?.state_name}</p>
      </div>
    </section>
  );
}
