import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStoreData from "../../data/coffee-stores.json";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";
import fetchCoffeeStores from "../../libs/coffee-stores";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/store/store-context";
import { isEmpty } from "../../utils";

export async function getStaticProps(staticProps) {
  const { params } = staticProps;
  const coffeeStore = await fetchCoffeeStores();
  const coffeeStoreById = coffeeStore.find((coffeeStore) => {
    return coffeeStore.fsq_id.toString() === params.id;
  });
  return {
    props: {
      coffeeStore: coffeeStoreById ? coffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStore = await fetchCoffeeStores();
  const paths = coffeeStore.map((coffeeStore) => {
    return { params: { id: coffeeStore.fsq_id.toString() } };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();

  const id = router.query.id;

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore);

  useEffect(() => {
    if (isEmpty(props.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const coffeeStoreById = coffeeStores.find((coffeeStore) => {
          return coffeeStore.fsq_id.toString() === id;
        });
        setCoffeeStore(coffeeStoreById);
      }
    }
  }, [id]);

  if (router.isFallback) {
    return <h2>Loading...</h2>;
  }

  const { address, locality, name, imgUrl } = coffeeStore;
  const handleUpvoteButton = () => {
    console.log("handle up vote");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/" legacyBehavior>
              <a>⬅ Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/home.svg" width={24} height={24} />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/near_me.svg" width={24} height={24} />
            <p className={styles.text}>{locality}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/favorite.svg" width={24} height={24} />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
