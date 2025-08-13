import { useState, useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";
import FilterBar from "@/components/FilterBar/FilterBar";
import PlantList from "@/components/PlantList/PlantList";
import PaginationBar from "@/components/PaginationBar/PaginationBar";
import { useOptimisticOwned } from "@/hooks/useOptimisticOwned";

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 90%;
  margin: 2rem auto 1rem;
`;

export default function PlantExplorer({ search }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [lightFilter, setLightFilter] = useState("All");
  const [waterFilter, setWaterFilter] = useState("All");

  useEffect(() => {
    setPage(1);
  }, [lightFilter, waterFilter, search]);

  const swrKey = `/api/plants?page=${page}&limit=${limit}&lightNeed=${lightFilter}&waterNeed=${waterFilter}&search=${encodeURIComponent(
    search
  )}`;

  const { data, error } = useSWR(swrKey);

  if (error) return <div>Error loading plants.</div>;
  if (!data) return <div>Loading...</div>;

  const { plants, totalPages, total, allLightNeeds, allWaterNeeds } = data;
  const LIGHT_NEEDS = allLightNeeds || ["All"];
  const WATER_NEEDS = allWaterNeeds || ["All"];

  // Use the custom hook for optimistic UI
  const { mergeOptimistic, toggleOwned } = useOptimisticOwned(swrKey, data);

  const displayPlants = mergeOptimistic(plants);

  return (
    <>
      <StyledButtonContainer>
        <Link href="/create">
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
        totalPlants={total}
        plants={displayPlants}
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
