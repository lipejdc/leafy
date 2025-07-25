import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Layout from "@/components/Layout";
import { Toaster } from "sonner";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [ownedPlants, setOwnedPlants] = useState({});

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

    const updatedPlant = await response.json();

    // Update your local state to keep UI in sync
    setOwnedPlants((prev) => ({
      ...prev,
      [plantId]: updatedPlant.isOwned,
    }));
  } catch (error) {
    console.error(error);
  }
}

function isPlantOwned(plantId, defaultOwned) {
  //Check if plant has a value in local state; if yes, use it, otherwise use isOwned from DB
  return ownedPlants?.[plantId] !== undefined ? ownedPlants[plantId] : defaultOwned;
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
        <Component
          {...pageProps}
          toggleOwned={toggleOwned}
          isPlantOwned={isPlantOwned}
        />
      </Layout>
    </SWRConfig>
  );
}
