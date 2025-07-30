import styled from "styled-components";

export const StyledCard = styled.article`
  position: relative;
  width: 100%;
  max-width: 30rem;
  border: 1px solid #ccc;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.1);
  text-align: center;
  padding-bottom: 1rem;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const Name = styled.h2`
  font-size: 1.25rem;
  margin: 0 0 0.3rem;
`;

export const BotanicalName = styled.p`
  font-size: 1rem;
  color: #555;
  font-style: italic;
  margin: 0;
`;

export const LightNeedWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  margin-top: 0.5rem;
`;

export const WaterNeedWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  margin-top: 0.25rem;
`;
