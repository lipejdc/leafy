import { useState } from "react";
import { mutate } from "swr";
import { useSession } from "next-auth/react";

export function useOptimisticOwned(swrKey, data) {
  const [optimisticOwned, setOptimisticOwned] = useState({});
  const { data: session, status } = useSession();

  async function toggleOwned(plantId, isOwned) {
    if (status !== "authenticated") {
    console.error("User session not ready or not authenticated");
    return;
    }

    // Save previous state for rollback
    const prevOwned =
      optimisticOwned[plantId] ??
      data.plants
        .find((p) => p._id === plantId)
        ?.ownedBy.includes(session.user.id);

    // Optimistic update
    setOptimisticOwned((prev) => ({ ...prev, [plantId]: isOwned }));

    const foundPlant = data.plants.find((p) => p._id === plantId);

    if (!foundPlant?.ownedBy.includes(session.user.id)) {
      foundPlant.ownedBy.push(session.user.id);
    } else {
      //Remove user from ownedBy
      foundPlant.ownedBy = foundPlant.ownedBy.filter(
        (uid) => uid.toString() !== session.user.id
      );
    }

    mutate(
      swrKey,
      {
        ...data,
        plants: data.plants.map((p) =>
          p._id === plantId ? foundPlant : p
        ),
      },
      false
    );

    try {
      const response = await fetch(`/api/plants/${plantId}`, {
        method: "PUT",
      });

      if (!response.ok) throw new Error("Failed to update plant");

      mutate((key) => key && key.startsWith("/api/plants"));
    } catch (err) {
      console.error(err);
      // Rollback
      setOptimisticOwned((prev) => ({ ...prev, [plantId]: prevOwned }));
      mutate((key) => key && key.startsWith("/api/plants"));
    }
  }

  return { toggleOwned };
}
