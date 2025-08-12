import Card from "../Card/Card";
import { ListSection, ListItem, EmptyMessage, PlantCount } from "./styles";

export default function PlantList({
  plants,
  toggleOwned,
  emptyMessage,
  totalPlants,
}) {
  if (!plants.length) {
    return <EmptyMessage>{emptyMessage || "No plants found 🌿"}</EmptyMessage>;
  }

  return (
    <>
      {" "}
      <PlantCount>
        Showing {plants.length} of {totalPlants} plants
      </PlantCount>
      <ListSection>
        {plants.map((plant) => (
          <ListItem key={plant._id}>
            <Card plant={plant} toggleOwned={toggleOwned} />
          </ListItem>
        ))}
      </ListSection>
    </>
  );
}
