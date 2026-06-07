import "../src/index.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Website Title */}
        <title>Mano Ranjan Portfolio</title>

        {/* Description */}
        <meta
          name="description"
          content="Aspiring Data Scientist Portfolio"
        />

        {/* Browser Tab Logo / Favicon */}
        <link rel="icon" href="/logo.png" />

        {/* Optional */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}