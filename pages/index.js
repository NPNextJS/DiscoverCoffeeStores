import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Banner from "../components/banner";
import Card from "../components/card";
import fetchCoffeeStores from "../libs/coffee-stores";

export async function getStaticProps(context) {
  const coffeeStore = await fetchCoffeeStores();
  return {
    props: {
      coffeeStore,
    },
  };
}

export default function Home(props) {
  const { coffeeStore } = props;
  const handleOnBannerClick = () => {
    console.log("Banner clicked");
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
          buttonText="View stores nearby!"
          handleOnClick={handleOnBannerClick}
        />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} />
        </div>
        {coffeeStore.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStore.map((coffeeStore) => {
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
          </>
        )}
      </main>
    </>
  );
}
