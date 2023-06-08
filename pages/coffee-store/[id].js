import Link from "next/link";
import { useRouter } from "next/router";

const CoffeeStore = () => {
  const router = useRouter();
  return (
    <div>
      Coffee Store Page {router.query.id}
      <Link href="/" legacyBehavior>
        <a>Back to home</a>
      </Link>
      <Link href="/coffee-store/dynamic" legacyBehavior>
        <a>Dynamic route</a>
      </Link>
    </div>
  );
};

export default CoffeeStore;
