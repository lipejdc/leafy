import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Layout from "@/components/Layout";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
      <Layout>
        <GlobalStyle />
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
