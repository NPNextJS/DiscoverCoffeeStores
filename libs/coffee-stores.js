import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getCoffeeStoresURL = (query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&limit=${limit}`;
};

const getListCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  });

  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => {
    return result.urls["small"];
  });
};

const fetchCoffeeStores = async () => {
  const coffeeStorePhotos = await getListCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(getCoffeeStoresURL("coffee", 6), options);
  const data = await response.json();
  return data.results.map((result, idx) => {
    return {
      fsq_id: result.fsq_id,
      name: result.name,
      address: result.location.address || result.location.formatted_address,
      locality: result.location.locality,
      imgUrl: coffeeStorePhotos[idx % coffeeStorePhotos.length],
    };
  });
};

export default fetchCoffeeStores;
