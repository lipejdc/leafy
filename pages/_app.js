import GlobalStyle from "../styles";
import { SWRConfig, mutate } from "swr";
import Layout from "@/components/Layout/Layout";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request with ${JSON.stringify(args)} failed.`);
  }
  return await response.json();
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <GlobalStyle />
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}
