import styled from "styled-components";
import useSWR from "swr";
import Card from "../components/Card";

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

export default function MyPlantsPage({ toggleOwned, isPlantOwned }) {
  const { data, error, isLoading } = useSWR("/api/plants");

  if (error) return <Message>Failed to load your plants.</Message>;
  if (isLoading) return <Message>Loading your plants...</Message>;

  const ownedPlants = data?.filter((plant) => isPlantOwned(plant._id, plant.isOwned));

  return (
    <>
    <Heading>My Plants</Heading>
      {ownedPlants.length === 0 ? (
        <Message>{`You haven't marked any plants as owned yet.`}</Message>
      ) : (
        <ListSection>
          {ownedPlants.map((plant) => (
            <ListItem key={plant._id}>
              <Card
                name={plant.name}
                botanicalName={plant.botanicalName}
                imageUrl={plant.imageUrl}
                id={plant._id}
                isOwned
                toggleOwned={toggleOwned}
              />
            </ListItem>
          ))}
        </ListSection>
      )}
    </>
  );
}
