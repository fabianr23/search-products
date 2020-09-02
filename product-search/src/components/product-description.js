import React from "react";
import "../sass/product-description.scss";
import getItemsEndpoint from "./items-endpoint";
import getItemsDescriptionEndpoint from "./items-description-endpoint";

class singleProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
    };
  }

  async componentDidMount() {
    if (this.props?.match?.params) {
      try {
        this.setSingleProduct(this.props.match.params.id);
      } catch (err) {
        return err;
      }
    }
    if (this.props?.product) {
      this.setState({ product: this.props.product });
    }
  }

  setSingleProduct = async (productID) => {
    const { response, error } = await getItemsEndpoint(productID);
    const {
      responseDescription,
      errorDescription,
    } = await getItemsDescriptionEndpoint(productID);

    if (response && !error) {
      const productComplete = { ...response };
      if (responseDescription && !errorDescription) {
        productComplete.description_plain_text = responseDescription.plain_text;
      }
      this.setState({ product: productComplete });
    }
  };

  render() {
    const { product } = this.state;
    if (!Object.keys(product).length || !product.item) {
      return null;
    }
    return (
      <section className="container-product">
        <div className="container-product__product-info">
          <figure className="container-product__image">
            <img
              src={product.item.picture?.secure_url}
              alt={product.item.title}
            />
          </figure>
          <article className="container-product__description">
            <h2>Descripcion del producto</h2>
            <p>{product.item.description}</p>
          </article>
        </div>
        <div className="container-product__properties">
          <span className="product-properties__subtitle">
            {product.item.condition} - {product.item.sold_quantity} vendidos
          </span>
          <h2>{product.item.title}</h2>
          <span className="product-properties__price">
            $ {product.item.price}
          </span>
          <button className="product-properties__button-buy">Comprar</button>
        </div>
      </section>
    );
  }
}

export default singleProduct;
