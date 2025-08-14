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
  //Toggle plant ownership for the logged-in user
  async function toggleOwned(plantId, isOwned, userId) {
    try {
      const response = await fetch(`/api/plants/${plantId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOwned }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to update plant ownership");

      //Revalidate all plant-related SWR caches
      mutate(
        `/api/plants/${plantId}`,
        async (cachedPlant) => {
          return {
            ...cachedPlant,
            ownedBy: isOwned
              ? [...cachedPlant.ownedBy, session.user.id]
              : cachedPlant.ownedBy.filter((id) => id !== session.user.id),
          };
        },
        false
      );
    } catch (error) {
      console.error(error);
    }
  }

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
