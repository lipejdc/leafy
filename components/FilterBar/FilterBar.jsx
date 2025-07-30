import * as styles from "./styles";

export default function FilterBar({
  lightNeeds,
  waterNeeds,
  lightFilter,
  waterFilter,
  setLightFilter,
  setWaterFilter,
}) {
  return (
    <styles.FilterBarWrapper>
      <styles.FilterLabel>Filter by light needs:</styles.FilterLabel>
      {lightNeeds.map((need) => (
        <styles.FilterButton
          key={need}
          onClick={() => setLightFilter(lightFilter === need ? "All" : need)}
          active={lightFilter === need}
        >
          {need}
        </styles.FilterButton>
      ))}

      <styles.FilterLabel>Filter by water needs:</styles.FilterLabel>
      {waterNeeds.map((need) => (
        <styles.FilterButton
          key={need}
          onClick={() => setWaterFilter(waterFilter === need ? "All" : need)}
          active={waterFilter === need}
        >
          {need}
        </styles.FilterButton>
      ))}
    </styles.FilterBarWrapper>
  );
}
