import axios from "axios";

export default async function getSearchEndpoint(query) {
  const searchAPIURl = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;

  try {
    let response = await axios.get(searchAPIURl);
    return {
      response: response.data,
    };
  } catch (error) {
    return {
      response: [],
    };
  }
}
