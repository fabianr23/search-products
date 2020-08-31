import axios from "axios";

export default async function getSearchEndpoint(query) {
  const searchAPIURl = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;

  try {
    let response = await axios.get(searchAPIURl);
    const msgResult =
      response?.data?.results?.length > 0
        ? ""
        : "No results found, try with another search please.";
    return {
      response: response.data,
      message: msgResult,
    };
  } catch (error) {
    return {
      response: [],
      message: "Failed to fetch the data, Please check network",
    };
  }
}
