import styled from "styled-components";
import useSWR from "swr";
import Card from "../components/Card";
import { useRouter } from "next/router";
import Link from "next/link";

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

const StyledButtonContainer = styled.div`
  // move the button to the right
  display: flex;
  justify-content: flex-end;
`;

export default function HomePage() {
  const { data, error, isLoading } = useSWR("/api/plants");
  const router = useRouter();

  if (error) return <p>Failed to load plants.</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <StyledButtonContainer>
        {" "}
        <Link href={"/create"}>
          <button> + add Plant</button>
        </Link>
      </StyledButtonContainer>

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
    </>
  );
}
