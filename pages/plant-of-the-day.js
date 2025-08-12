import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.main`
  padding: 2rem;
  max-width: 600px;
  margin: 2rem auto;
  background: var(--color-white);
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 1s ease-in-out, transform 0.8s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
    box-shadow: 0 0 20px rgba(46, 125, 50, 0.3);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px);}
  to { opacity: 1; transform: translateY(0);}
`;

const Image = styled.img`
  width: 100%;
  max-height: 350px;
  object-fit: cover;
  border-radius: 1rem;
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.6s ease forwards;
`;

const Title = styled.h1`
  color: var(--color-primary);
  margin-bottom: 0.25rem;
`;

const Botanical = styled.h2`
  color: var(--color-accent);
  font-style: italic;
  margin-bottom: 1.5rem;
`;

const Info = styled.div`
  text-align: left;
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.4;
`;

const Label = styled.span`
  font-weight: 600;
  color: var(--color-primary);
`;

const Fallback = styled.p`
  font-style: italic;
  color: var(--color-border);
`;

export default function PlantOfTheDay({ plants }) {
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    if (!plants || plants.length === 0) return;

    const todayKey = "plantOfTheDay_" + new Date().toDateString();
    const cached = localStorage.getItem(todayKey);

    if (cached) {
      setPlant(JSON.parse(cached));
    } else {
      const randomPlant = plants[Math.floor(Math.random() * plants.length)];
      setPlant(randomPlant);
      localStorage.setItem(todayKey, JSON.stringify(randomPlant));
    }
  }, [plants]);

  if (!plants || plants.length === 0) {
    return (
      <Container>
        <Fallback>No plants stored yet. Please add some plants first.</Fallback>
      </Container>
    );
  }

  if (!plant) return <Container>Loading...</Container>;

  return (
    <Container className={plant ? "visible" : ""}>
      <Title>{plant.name}</Title>
      <Botanical>{plant.botanicalName}</Botanical>
      {plant.imageUrl && <Image src={plant.imageUrl} alt={plant.name} />}

      <Info>
        <Label>Light Needs:</Label> {plant.lightNeed}
      </Info>
      <Info>
        <Label>Water Needs:</Label> {plant.waterNeed}
      </Info>
      <Info>
        <Label>Fertiliser Seasons:</Label>{" "}
        {plant.fertiliserSeason?.join(", ") || "N/A"}
      </Info>
      <Info>
        <Label>Description:</Label>{" "}
        {plant.description || "No description available."}
      </Info>

      {process.env.NODE_ENV === "development" && (
        <button
          onClick={() => {
            const todayKey = "plantOfTheDay_" + new Date().toDateString();
            localStorage.removeItem(todayKey);
            window.location.reload();
          }}
        >
          Refresh Plant (dev only)
        </button>
      )}
    </Container>
  );
}
