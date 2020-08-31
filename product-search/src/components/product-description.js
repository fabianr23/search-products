import React from "react";
import "../sass/product-description.scss";

export default function singleProduct(props) {
  const { product } = props;
  console.dir(props);
  if (!Object.keys(product).length) {
    return null;
  }
  return (
    <section className="container-product">
      <div className="container-product__product-info">
        <figure className="container-product__image">
          <img src={product.pictures[0]?.secure_url} alt={product.title} />
        </figure>
        <article className="container-product__description">
          <h2>Descripcion del producto</h2>
          <p>{product.description_plain_text}</p>
        </article>
      </div>
      <div className="container-product__properties">
        <span className="product-properties__subtitle">
          {product.condition} - {product.sold_quantity} vendidos
        </span>
        <h2>{product?.title}</h2>
        <span className="product-properties__price">$ {product.price}</span>
        <button className="product-properties__button-buy">Comprar</button>
      </div>
    </section>
  );
}
