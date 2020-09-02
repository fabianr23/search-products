import axios from "axios";

export default async function getItemsDescriptionEndpoint(id) {
  const itemsDescriptionAPIURl = `https://api.mercadolibre.com/items/${id}/description`;

  try {
    let response = await axios.get(itemsDescriptionAPIURl);
    const data = transformResponse(response.data);
    return {
      responseDescription: data,
      errorDescription: null,
    };
  } catch (error) {
    return {
      responseDescription: {},
      errorDescription: error,
    };
  }
}

function transformResponse(data) {
  let dataTransformed = {
    description: data.plain_text,
  };
  return dataTransformed;
}
