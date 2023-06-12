import "@/styles/globals.css";
import localFile from "next/font/local";
import { IBM_Plex_Sans } from "next/font/google";

/** nextjs host font from google font */
const ips = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: "500",
  style: "normal",
});

/** local font */
const bagel = localFile({
  src: [
    {
      path: "../public/fonts/Bagel_Fat_One/BagelFatOne-Regular.ttf",
    },
  ],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${ips.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
