import { useState, useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";
import PlantList from "@/components/PlantList/PlantList";
import PaginationBar from "@/components/PaginationBar/PaginationBar";
import { useOptimisticOwned } from "@/hooks/useOptimisticOwned";

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 90%;
  margin: 2rem auto 1rem;
`;

export default function PlantExplorer({
  search,
  lightFilter,
  waterFilter,
  setLightNeedsOptions,
  setWaterNeedsOptions,
}) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    setPage(1);
  }, [lightFilter, waterFilter, search]);

  const swrKey = `/api/plants?page=${page}&limit=${limit}&lightNeed=${lightFilter}&waterNeed=${waterFilter}&search=${encodeURIComponent(
    search
  )}`;

  const { data, error, isLoading } = useSWR(swrKey);

  // Use the custom hook for optimistic UI
  const { toggleOwned: optimisticToggleOwned } =
    useOptimisticOwned(swrKey, data);

  useEffect(() => {
    if (data) {
      setLightNeedsOptions(data.allLightNeeds || ["All"]);
      setWaterNeedsOptions(data.allWaterNeeds || ["All"]);
    }
  }, [data, setLightNeedsOptions, setWaterNeedsOptions]);

  // Only show loading/error in the list area
  if (error)
    return (
      <>
        <StyledButtonContainer>
          <Link href="/create">
            <button>+ add Plant</button>
          </Link>
        </StyledButtonContainer>
        <div style={{ textAlign: "center", margin: "2rem" }}>
          Error loading plants.
        </div>
      </>
    );

  if (isLoading || !data)
    return (
      <>
        <StyledButtonContainer>
          <Link href="/create">
            <button>+ add Plant</button>
          </Link>
        </StyledButtonContainer>
        <div style={{ textAlign: "center", margin: "2rem" }}>Loading...</div>
      </>
    );

  const { plants, totalPages, total } = data;

  return (
    <>
      <StyledButtonContainer>
        <Link href="/create">
          <button>+ add Plant</button>
        </Link>
      </StyledButtonContainer>

      <PlantList
        totalPlants={total}
        plants={plants}
        toggleOwned={optimisticToggleOwned}
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
