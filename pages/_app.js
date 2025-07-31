import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import useSWR from "swr";
import Layout from "@/components/Layout/Layout";
import { Toaster } from "sonner";

const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request with ${JSON.stringify(args)} failed.`);
  }
  return await response.json();
};

export default function App({ Component, pageProps }) {
  const {
    data: plants,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/plants", fetcher);

  async function toggleOwned(plantId) {
    const updatedPlants = plants.map((plant) => {
     return plant._id === plantId ? { ...plant, isOwned: !plant.isOwned } : plant;
    });

    const updatedPlant = updatedPlants.find((p) => p._id === plantId);
    mutate(updatedPlants, false);

    try {
      const response = await fetch(`/api/plants/${plantId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isOwned: updatedPlant.isOwned }),
      });

      if (!response.ok) throw new Error("Failed to update plant");
    } catch (error) {
      mutate();
      console.error(error);
    }
  }

  if (error) return <p>Failed to load plants.</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      <Layout>
        <GlobalStyle />
        <Toaster />
        <Component {...pageProps} toggleOwned={toggleOwned} plants={plants} />
      </Layout>
    </SWRConfig>
  );
}
