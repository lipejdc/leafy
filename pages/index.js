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
  const [lightFilter, setLightFilter] = useState("All");
  const [waterFilter, setWaterFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch paginated, filtered, and searched plants from the API
  const { data, error } = useSWR(
    `/api/plants?page=${page}&limit=${limit}&lightNeed=${lightFilter}&waterNeed=${waterFilter}&search=${encodeURIComponent(
      searchQuery
    )}`
  );

  if (error) return <div>Error loading plants.</div>;
  if (!data) return <div>Loading...</div>;

  const { plants, totalPages, total } = data;

  // Get unique filter options from the current dataset
  const LIGHT_NEEDS = [
    "All",
    ...new Set(plants.map((plant) => plant.lightNeed)),
  ];
  const WATER_NEEDS = [
    "All",
    ...new Set(plants.map((plant) => plant.waterNeed)),
  ];

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
        totalPlants={total}
        plants={plants}
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
