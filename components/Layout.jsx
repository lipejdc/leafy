import Head from "next/head";
import styled from "styled-components";

const Main = styled.main`
  padding: 0.5rem;
`;

const Headline = styled.h1`
  padding: 2rem;
  text-align: center;
  margin: 0;
`;

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Leafy</title>
      </Head>
      <Main>
        <Headline>Leafy</Headline>
        {children}
      </Main>
    </>
  );
}
