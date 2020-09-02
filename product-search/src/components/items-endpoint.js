import axios from "axios";

export default async function getItemsEndpoint(id) {
  const itemsAPIURl = `https://api.mercadolibre.com/items/${id}`;

  try {
    const response = await axios.get(itemsAPIURl);
    const data = transformResponse(response.data);
    return {
      response: data,
      error: null,
    };
  } catch (error) {
    return {
      response: [],
      error,
    };
  }
}

function transformResponse(data) {
  let dataTransformed = {
    item: {
      id: data.id,
      title: data.title,
      price: data.price,
      picture: data.pictures[0],
      condition: data.condition,
      free_shipping: data.shipping.free_shipping,
      sold_quantity: data.sold_quantity,
      description: data.descriptions[0].id,
    },
  };
  return dataTransformed;
}
