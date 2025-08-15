import { mutate } from "swr";
import { useSession } from "next-auth/react";

export function useOptimisticOwned(swrKey, data) {
  const { data: session, status } = useSession();

  async function toggleOwned(plantId) {
    if (status !== "authenticated") {
      console.error("User session not ready or not authenticated");
      return;
    }

    // Save previous state for rollback
    const prevOwned = JSON.parse(JSON.stringify(data));

    const updatedPlants = data.plants.map((plant) =>
      plant._id === plantId
        ? {
            ...plant,
            ownedBy: plant.ownedBy.includes(session.user.id)
              ? plant.ownedBy.filter((uid) => uid !== session.user.id)
              : [...plant.ownedBy, session.user.id],
          }
        : plant
    );

    mutate(
      swrKey,
      {
        ...data,
        plants: updatedPlants
      },
      false
    );

    try {
      const response = await fetch(`/api/plants/${plantId}`, {
        method: "PUT",
      });

      if (!response.ok) throw new Error("Failed to update plant");

      mutate(swrKey);
    } catch (err) {
      console.error(err);
      // Rollback
      mutate(swrKey, prevOwned, false);
    }
  }

  return { toggleOwned };
}
