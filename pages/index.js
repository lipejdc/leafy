import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";
import SearchBar from "@/components/SearchBar/SearchBar";
import FilterBar from "../components/FilterBar/FilterBar";
import PlantList from "../components/PlantList/PlantList";

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 90%;
  margin: 2rem auto 1rem;
`;

export default function HomePage({ toggleOwned }) {
  const { data, error, isLoading } = useSWR("/api/plants");
  const [lightFilter, setLightFilter] = useState("All");
  const [waterFilter, setWaterFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  if (error) return <p>Failed to load plants.</p>;
  if (isLoading) return <p>Loading...</p>;

  const LIGHT_NEEDS = ["All", ...new Set(data.map((plant) => plant.lightNeed))];
  const WATER_NEEDS = ["All", ...new Set(data.map((plant) => plant.waterNeed))];

  const filteredPlants = data
    .filter(
      (plant) =>
        (lightFilter === "All" || plant.lightNeed === lightFilter) &&
        (waterFilter === "All" || plant.waterNeed === waterFilter)
    )
    .filter((plant) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        plant.name.toLowerCase().startsWith(query) ||
        plant.botanicalName?.toLowerCase().startsWith(query)
      );
    });

  return (
    <>
      <StyledButtonContainer>
        <Link href="/create">
          <button>+ add Plant</button>
        </Link>
      </StyledButtonContainer>

      <SearchBar searchQuery={searchQuery} onChange={setSearchQuery} />

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
        emptyMessage="No results found 🌱"
      />
    </>
  );
}
