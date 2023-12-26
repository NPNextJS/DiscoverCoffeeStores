import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Banner from "../components/banner";
import Card from "../components/card";
import fetchCoffeeStores from "../libs/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";
import { useContext, useEffect, useState } from "react";
import { ACTION_TYPES, StoreContext } from "@/store/store-context";

export async function getStaticProps(context) {
  const coffeeStore = await fetchCoffeeStores();
  return {
    props: {
      coffeeStore,
    },
  };
}

export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, isLocating } =
    useTrackLocation();
  // const [coffeeStoresNearMe, setCoffeeStoresNearMe] = useState([]);
  const [coffeeStoresNearMeError, setCoffeeStoresNearMeError] = useState(null);
  const { dispatch, state } = useContext(StoreContext);

  const { latLong, coffeeStores } = state;

  useEffect(() => {
    async function fetchNearByCoffeeStores() {
      if (latLong) {
        try {
          const res = await fetch(
            `/api/getCoffeeStoreByLocation?latLong=${latLong}&limit30`
          );
          const coffeeStores = await res.json();
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: { coffeeStores },
          });
        } catch (error) {
          console.log(error);
          setCoffeeStoresNearMeError(error.message);
        }
      }
    }
    fetchNearByCoffeeStores();
  }, [latLong]);

  const handleOnBannerClick = () => {
    handleTrackLocation();
  };
  return (
    <>
      <Head>
        <title>Coffee Stores</title>
        <meta name="description" content="Search Coffee Stores" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isLocating ? "Loading..." : "View stores nearby!"}
          handleOnClick={handleOnBannerClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresNearMeError && (
          <p>Something went wrong: {coffeeStoresNearMeError}</p>
        )}
        <div className={styles.heroImage}>
          <Image
            alt="hero"
            src="/static/hero-image.png"
            width={700}
            height={400}
          />
        </div>
        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Coffe Stores Near Me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.fsq_id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.fsq_id}`}
                  />
                );
              })}
            </div>
          </div>
        )}
        {props.coffeeStore.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStore.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.fsq_id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.fsq_id}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
