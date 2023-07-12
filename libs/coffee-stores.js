const getCoffeeStoresURL = (query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&limit=${limit}`;
};

const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(getCoffeeStoresURL("coffee", 6), options);
  const data = await response.json();
  return data.results;
};

export default fetchCoffeeStores;
