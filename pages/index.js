import styled from "styled-components";
import useSWR from "swr";
import Card from "../components/Card";

const ListSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 2rem;
  gap: 2rem;
`;

export default function HomePage() {
  const { data , error, isLoading } = useSWR("/api/plants");

  if (error) return <p>Failed to load plants.</p>;
  if (isLoading && !data) return <p>Loading...</p>;

  return (
    <ListSection>
      {data?.map((plant) => (
        <Card
          key={plant._id}
          name={plant.name}
          botanicalName={plant.botanicalName}
          imageUrl={plant.imageUrl}
        />
      ))}
    </ListSection>
  );
}
