import styled, { keyframes } from "styled-components";
import useSWR from "swr";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px);}
  to { opacity: 1; transform: translateY(0);}
`;

const Container = styled.main`
  padding: 2rem;
  max-width: 600px;
  margin: 2rem auto;
  background: var(--color-white);
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: ${fadeIn} 0.8s ease forwards;

  &.visible {
    box-shadow: 0 0 20px rgba(46, 125, 50, 0.3);
  }
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

export default function PlantOfTheDay() {
  const { data: plant, error, isLoading, mutate } = useSWR("/api/plant-of-the-day");

  if (error)
    return (
      <Container>
        <Fallback>Error: {error.message}</Fallback>
      </Container>
    );

  if (isLoading)
    return (
      <Container>
        <Fallback>Loading...</Fallback>
      </Container>
    );

  return (
  <Container key={plant._id} className="visible">
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
        onClick={async () => {
          await fetch("/api/plant-of-the-day", { method: "DELETE" });
          mutate();
        }}
      >
        Refresh Plant (dev only)
      </button>
    )}
  </Container>
);
}
