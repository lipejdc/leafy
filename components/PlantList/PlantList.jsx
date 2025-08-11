import Card from "../Card/Card";
import { ListSection, ListItem, EmptyMessage } from "./styles";

export default function PlantList({ plants, toggleOwned, emptyMessage }) {
  if (!plants.length) {
    return <EmptyMessage>{emptyMessage || "No plants found 🌿"}</EmptyMessage>;
  }

  return (
    <ListSection>
      {plants.map((plant) => (
        <ListItem key={plant._id}>
          <Card plant={plant} toggleOwned={toggleOwned} />
        </ListItem>
      ))}
    </ListSection>
  );
}
