import styled from "styled-components";
import useSWR from "swr";
import Card from "../components/Card";
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
  display: flex;
  justify-content: center;
  width: 30rem;
  max-width: 90vw;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 90%;
  margin-bottom: 2rem;
`;

export default function HomePage({ toggleOwned }) {
  const { data, error, isLoading } = useSWR("/api/plants");

  if (error) return <p>Failed to load plants.</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <StyledButtonContainer>
        <Link href={"/create"}>
          <button>+ add Plant</button>
        </Link>
      </StyledButtonContainer>

      <ListSection>
        {data?.map((plant) => (
          <ListItem key={plant._id}>
            <Card plant={plant} toggleOwned={toggleOwned}/>
          </ListItem>
        ))}
      </ListSection>
    </>
  );
}
