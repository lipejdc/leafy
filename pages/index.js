import useSWR from "swr";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import PlantList from "@/components/PlantList";
import FilterBar from "../components/FilterBar";

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 90%;
  margin-bottom: 2rem;
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

      <PlantList
        plants={filteredPlants}
        toggleOwned={toggleOwned}
        emptyMessage="No plants match this filter 🌿"
      />
    </>
  );
}
