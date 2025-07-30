import GlobalStyle from "../styles";
import { SWRConfig, mutate } from "swr";
import Layout from "@/components/Layout/Layout";
import { Toaster } from "sonner";


export default function App({ Component, pageProps }) {
  async function toggleOwned(plantId, currentIsOwned) {
    try {
      const response = await fetch(`/api/plants/${plantId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isOwned: !currentIsOwned }),
      });

      if (!response.ok) throw new Error("Failed to update plant");
      mutate("/api/plants");
    } catch (error) {
      console.error(error);
    }
  }

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
        <Component {...pageProps} toggleOwned={toggleOwned} />
      </Layout>
    </SWRConfig>
  );
}
