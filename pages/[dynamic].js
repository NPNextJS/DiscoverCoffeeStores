import { useRouter } from "next/router";
import Head from "next/head";

const Dynamic = () => {
  const {
    query: { dynamic },
  } = useRouter();

  return (
    <div>
      <Head>
        <title>{dynamic}</title>
      </Head>
      This is dynamic page: {dynamic}
    </div>
  );
};

export default Dynamic;
