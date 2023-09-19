import { useContext, useState } from "react";
import { ACTION_TYPES, StoreContext } from "@/store/store-context";

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  // const [latLong, setLatLong] = useState("");
  const [isLocating, setIslocating] = useState(false);
  const { dispatch } = useContext(StoreContext);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // setLatLong(`${latitude},${longitude}`);
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitude},${longitude}` },
    });
    setIslocating(false);
    setLocationErrorMsg("");
  };

  const error = () => {
    setLocationErrorMsg("Unable to retrieve your location");
    setIslocating(false);
  };

  const handleTrackLocation = () => {
    setIslocating(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not support by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    // latLong,
    handleTrackLocation,
    locationErrorMsg,
    isLocating,
  };
};

export default useTrackLocation;
