import useSWR from "swr";
import { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Link from "next/link";
import FilterBar from "../components/FilterBar"; // Imported component

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

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #777;
  margin-top: 2rem;
`;

export default function HomePage({ toggleOwned }) {
  const { data, error, isLoading } = useSWR("/api/plants");
  const [lightFilter, setLightFilter] = useState("All");
  const [waterFilter, setWaterFilter] = useState("All");

  const LIGHT_NEEDS = data
    ? ["All", ...Array.from(new Set(data.map((p) => p.lightNeed)))]
    : ["All"];
  const WATER_NEEDS = data
    ? ["All", ...Array.from(new Set(data.map((p) => p.waterNeed)))]
    : ["All"];

  const filteredPlants = data?.filter(
    (plant) =>
      (lightFilter === "All" || plant.lightNeed === lightFilter) &&
      (waterFilter === "All" || plant.waterNeed === waterFilter)
  );

  if (error) return <p>Failed to load plants.</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <StyledButtonContainer>
        <Link href={"/create"}>
          <button>+ add Plant</button>
        </Link>
      </StyledButtonContainer>

      <FilterBar
        lightNeeds={LIGHT_NEEDS}
        waterNeeds={WATER_NEEDS}
        lightFilter={lightFilter}
        waterFilter={waterFilter}
        setLightFilter={setLightFilter}
        setWaterFilter={setWaterFilter}
      />

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
