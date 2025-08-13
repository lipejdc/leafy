import { useState } from "react";
import { mutate } from "swr";

export function useOptimisticOwned(swrKey, data) {
  const [optimisticOwned, setOptimisticOwned] = useState({});

  async function toggleOwned(plantId, isOwned) {
    setOptimisticOwned((prev) => ({ ...prev, [plantId]: isOwned }));

    mutate(
      swrKey,
      {
        ...data,
        plants: data.plants.map((plant) =>
          plant._id === plantId ? { ...plant, isOwned } : plant
        ),
      },
      false
    );

    try {
      const response = await fetch(`/api/plants/${plantId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOwned }),
      });
      if (!response.ok) throw new Error("Failed to update plant");
      mutate((key) => key && key.startsWith("/api/plants"));
    } catch (err) {
      setOptimisticOwned((prev) => ({ ...prev, [plantId]: !isOwned }));
      mutate((key) => key && key.startsWith("/api/plants"));
    }
  }

  function mergeOptimistic(plants) {
    return plants.map((plant) =>
      plant._id in optimisticOwned
        ? { ...plant, isOwned: optimisticOwned[plant._id] }
        : plant
    );
  }

  return { mergeOptimistic, toggleOwned };
}
