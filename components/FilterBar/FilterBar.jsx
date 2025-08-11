import { FilterBarWrapper, FilterButton, FilterLabel } from "./styles";

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
