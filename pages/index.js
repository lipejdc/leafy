import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";
import SearchBar from "@/components/SearchBar/SearchBar";
import FilterBar from "@/components/FilterBar/FilterBar";
import PlantList from "@/components/PlantList/PlantList";
import PaginationBar from "@/components/PaginationBar/PaginationBar";

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 90%;
  margin: 2rem auto 1rem;
`;

export default function HomePage({ toggleOwned }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  // Fetch paginated plants
  const { data, error } = useSWR(`/api/plants?page=${page}&limit=${limit}`);

  const [lightFilter, setLightFilter] = useState("All");
  const [waterFilter, setWaterFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  if (error) return <div>Error loading plants.</div>;
  if (!data) return <div>Loading...</div>;

  const { plants, totalPages } = data;

  // Filtering and searching can be done client-side for small datasets,
  // but for large datasets, you should send filter/search params to the API.
  const LIGHT_NEEDS = [
    "All",
    ...new Set(plants.map((plant) => plant.lightNeed)),
  ];
  const WATER_NEEDS = [
    "All",
    ...new Set(plants.map((plant) => plant.waterNeed)),
  ];

  const filteredPlants = plants
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

      <PaginationBar
        page={page}
        totalPages={totalPages}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
      />
    </>
  );
}
