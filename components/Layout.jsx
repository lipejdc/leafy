import Head from "next/head";
import styled from "styled-components";
import Navigation from "./Navigation"

const Main = styled.main`
  padding: 0.5rem;
`;

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
