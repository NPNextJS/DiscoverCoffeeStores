import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getCoffeeStoresURL = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
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

const fetchCoffeeStores = async (
  latLong = "43.65267326999575,-79.39545615725015",
  limit = 20
) => {
  const coffeeStorePhotos = await getListCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getCoffeeStoresURL(latLong, "coffee", limit),
    options
  );
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
