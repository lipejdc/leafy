import Card from "../Card/Card";
import * as styles from "./styles";

export default function PlantList({ plants, toggleOwned, emptyMessage }) {
  if (!plants.length) {
    return <styles.EmptyMessage>{emptyMessage || "No plants found 🌿"}</styles.EmptyMessage>;
  }

  return (
    <styles.ListSection>
      {plants.map((plant) => (
        <styles.ListItem key={plant._id}>
          <Card plant={plant} toggleOwned={toggleOwned} />
        </styles.ListItem>
      ))}
    </styles.ListSection>
  );
}
