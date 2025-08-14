import styled from "styled-components";
import useSWR, { mutate } from "swr";
import Card from "@/components/Card/Card";
import { getSession } from "next-auth/react";

const ListSection = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 0;
  padding: 2rem;
  margin: 0;
  list-style: none;
  justify-content: space-evenly;
`;

const ListItem = styled.li`
  flex: 1 1 30rem;
  display: flex;
  justify-content: center;
`;

const Message = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: #555;
`;

const Heading = styled.h2`
  padding: 1rem 2rem;
  text-align: left;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1rem 5rem;
`;

// Server-side protection for logged-in users only
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: { destination: "/login", permanent: false },
    };
  }

  return { props: { session } };
}

// Optimistic toggle function
async function toggleOwnedOptimistic(plantId, isOwned) {
  // Update local SWR cache immediately
  mutate("/api/plants", (data) => {
    if (!data) return data;
    return {
      ...data,
      plants: data.plants.map((plant) =>
        plant._id === plantId ? { ...plant, isOwned } : plant
      ),
    };
  }, false);

  try {
    const res = await fetch(`/api/plants/${plantId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isOwned }),
    });

    if (!res.ok) throw new Error("Failed to update plant");

    // Revalidate SWR
    mutate("/api/plants");
  } catch (err) {
    console.error(err);
  }
}

export default function MyPlantsPage({ session }) {
  const { data, error } = useSWR("/api/plants");

  if (error) return <Message>Failed to load your plants. Please try again later.</Message>;
  if (!data) return <Message>Loading your plants...</Message>;

  const ownedPlants = (data.plants || []).filter((plant) =>
    plant.ownedBy?.includes(session.user.id)
  );

  return (
    <>
      <Heading>My Plants</Heading>
      {ownedPlants.length === 0 ? (
        <Message>You haven&apos;t marked any plants as owned yet.</Message>
      ) : (
        <ListSection>
          {ownedPlants.map((plant) => (
            <ListItem key={plant._id}>
              <Card
                plant={plant}
                toggleOwned={(id, isOwned) => toggleOwnedOptimistic(id, isOwned)}
              />
            </ListItem>
          ))}
        </ListSection>
      )}
    </>
  );
}
