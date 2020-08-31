import axios from "axios";

export default async function getItemsDescriptionEndpoint(id) {
  const itemsDescriptionAPIURl = `https://api.mercadolibre.com/items/${id}/description`;

  try {
    let response = await axios.get(itemsDescriptionAPIURl);
    return {
      responseDescription: response.data,
      errorDescription: null,
    };
  } catch (error) {
    return {
      responseDescription: {},
      errorDescription: error,
    };
  }
}
