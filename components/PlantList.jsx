import styled from "styled-components";
import Card from "./Card";

const ListSection = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 0;
  padding: 2rem;
  margin: 0;
  list-style: none;
  justify-content: space-evenly;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: center;
  width: 30rem;
  max-width: 90vw;
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #777;
  margin-top: 2rem;
`;

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
