import Head from "next/head";
import styled from "styled-components";

const Main = styled.main`
  padding: 0.5rem;
  width: 100%;
`;

const Headline = styled.h1`
  padding: 2rem;
  text-align: center;
`;

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Leafy</title>
      </Head>
      <Headline>Leafy</Headline>
      <Main>{children}</Main>
    </>
  );
}
