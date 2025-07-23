import styled from "styled-components";
import useSWR from "swr";
import Card from "../components/Card";
import { useRouter } from "next/router";

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

export default function HomePage() {
  const { data, error, isLoading } = useSWR("/api/plants");
  const router = useRouter();

  if (error) return <p>Failed to load plants.</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <ListSection>
      {data?.map((plant) => (
        <ListItem key={plant._id}>
          <Card
            name={plant.name}
            botanicalName={plant.botanicalName}
            imageUrl={plant.imageUrl}
            id={plant._id}
          />
        </ListItem>
      ))}
    </ListSection>
  );
}
