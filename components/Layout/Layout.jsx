import Head from "next/head";
import Navigation from "../Navigation/Navigation"
import { Main } from "./styles";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Leafy</title>
      </Head>
      <Navigation/>
      <Main>
        {children}
      </Main>
    </>
  );
}
