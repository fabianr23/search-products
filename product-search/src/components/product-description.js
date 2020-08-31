import React from "react";
import "../sass/product-description.scss";

export default function CardProduct(productObject) {
  const product = productObject.product;
  return (
    <section className="product-description">
      <div className="product-description__product-info">
        <figure className="product-description__image">
          <img src={product.thumbnail} alt={product.title} />
        </figure>
        <article className="product-description__description">
          <h2>Descripcion</h2>
          <p>{product.title}</p>
        </article>
      </div>
      <div className="product-description__properties">
        <span>Nuevo - 234 vendidos</span>
        <h2>{product?.title}</h2>
        <span>$ 1982</span>
        <button className="button-buy">Comprar</button>
      </div>
    </section>
  );
}
