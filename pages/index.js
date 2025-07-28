import styled from "styled-components";
import useSWR from "swr";
import Card from "../components/Card";
import Link from "next/link";
import { useState } from "react";

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

const FilterBar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 2rem 0 2rem;
  flex-wrap: wrap;
`;
const FilterLabel = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 0%.5;
  align-self: flex-start;
  width: 100%;
`;
const FilterButton = styled.button`
  background: ${({ active }) => (active ? "black" : "#eee")};
  color: ${({ active }) => (active ? "white" : "#333")};
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
  font-size: 0.95rem;

  &:hover {
    background: black;
    color: white;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #777;
  margin-top: 2rem;
`;



export default function HomePage({ toggleOwned }) {
  const { data, error, isLoading } = useSWR("/api/plants");
  const [lightFilter, setLightFilter] = useState("All");

  const LIGHT_NEEDS = data
  ? ["All", ...Array.from(new Set(data.map((p) => p.lightNeed)))]
  : ["All"];

  const filteredPlants =
    lightFilter === "All"
      ? data
      : data?.filter((plant) => plant.lightNeed === lightFilter);

  if (error) return <p>Failed to load plants.</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <StyledButtonContainer>
        <Link href={"/create"}>
          <button>+ add Plant</button>
        </Link>
      </StyledButtonContainer>

      <FilterBar>
        <FilterLabel>Filter by light needs:</FilterLabel>

        {LIGHT_NEEDS.map((need) => {
          return (
            <FilterButton
              key={need}
              onClick={() =>
                setLightFilter(need)
              }
              active={lightFilter === need}
            >
              {need}
            </FilterButton>
          );
        })}
      </FilterBar>

      {filteredPlants?.length === 0 ? (
        <EmptyMessage>No plants match this filter 🌿</EmptyMessage>
      ) : (
        <ListSection>
          {filteredPlants.map((plant) => (
            <ListItem key={plant._id}>
              <Card plant={plant} toggleOwned={toggleOwned} />
            </ListItem>
          ))}
        </ListSection>
      )}
    </>
  );
}
