import Head from "next/head";
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Globelynks Blog" />
        <meta property="og:image" content="/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}