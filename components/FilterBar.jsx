import styled from "styled-components";

const FilterBarWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 2rem 0 2rem;
  flex-wrap: wrap;
`;

const FilterLabel = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
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

export default function FilterBar({
  lightNeeds,
  waterNeeds,
  lightFilter,
  waterFilter,
  setLightFilter,
  setWaterFilter,
}) {
  return (
    <FilterBarWrapper>
      <FilterLabel>Filter by light needs:</FilterLabel>
      {lightNeeds.map((need) => (
        <FilterButton
          key={need}
          onClick={() => setLightFilter(lightFilter === need ? "All" : need)}
          active={lightFilter === need}
        >
          {need}
        </FilterButton>
      ))}

      <FilterLabel>Filter by water needs:</FilterLabel>
      {waterNeeds.map((need) => (
        <FilterButton
          key={need}
          onClick={() => setWaterFilter(waterFilter === need ? "All" : need)}
          active={waterFilter === need}
        >
          {need}
        </FilterButton>
      ))}
    </FilterBarWrapper>
  );
}
