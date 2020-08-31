import axios from "axios";

export default async function getItemsEndpoint(id) {
  const itemsAPIURl = `https://api.mercadolibre.com/items/${id}`;

  try {
    let response = await axios.get(itemsAPIURl);
    return {
      response: response.data,
      error: null,
    };
  } catch (error) {
    return {
      response: [],
      error,
    };
  }
}
