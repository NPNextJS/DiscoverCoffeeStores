import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStoreData from "../../data/coffee-stores.json";

export async function getStaticProps(staticProps) {
  const { params } = staticProps;
  return {
    props: {
      coffeeStore: coffeeStoreData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
      }),
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const { coffeeStore } = props;
  const router = useRouter();

  if (router.isFallback) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      Coffee Store Page {router.query.id}
      <Link href="/" legacyBehavior>
        <a>Back to home</a>
      </Link>
      <Link href="/coffee-store/dynamic" legacyBehavior>
        <a>Dynamic route</a>
      </Link>
      <p>{coffeeStore.name}</p>
      <p>{coffeeStore.address}</p>
    </div>
  );
};

export default CoffeeStore;
