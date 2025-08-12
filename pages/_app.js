import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Layout from "@/components/Layout/Layout";
import { Toaster } from "sonner";
import { mutate } from "swr";

const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request with ${JSON.stringify(args)} failed.`);
  }
  return await response.json();
};

export default function App({ Component, pageProps }) {
  // Only pass toggleOwned, not plants
  async function toggleOwned(plantId, isOwned) {
    try {
      const response = await fetch(`/api/plants/${plantId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isOwned }),
      });
      // Revalidate all SWR keys starting with /api/plants
      mutate((key) => key && key.startsWith("/api/plants"));

      if (!response.ok) throw new Error("Failed to update plant");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SWRConfig value={{ fetcher }}>
      <Layout>
        <GlobalStyle />
        <Toaster />
        <Component {...pageProps} toggleOwned={toggleOwned} />
      </Layout>
    </SWRConfig>
  );
}
