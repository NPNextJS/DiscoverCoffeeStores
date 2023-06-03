import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
      <main className={`${styles.main} ${inter.className}`}>
        <Banner
          buttonText="View stores nearby!"
          handleOnBannerClick={handleOnBannerClick}
        />
      </main>
    </>
  );
}
