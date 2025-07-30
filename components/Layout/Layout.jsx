import Head from "next/head";
import Navigation from "./Navigation"
import * as styles from "./styles";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Leafy</title>
      </Head>
      <Navigation/>
      <styles.Main>
        {children}
      </styles.Main>
    </>
  );
}
