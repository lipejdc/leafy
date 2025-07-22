import styled from "styled-components";
import Image from "next/image";

const StyledCard = styled.article`
  width: 100%;
  max-width: 30rem;
  border: 1px solid #ccc;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.1);
  text-align: center;
  padding-bottom: 1rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const Name = styled.h2`
  font-size: 1.25rem;
  margin: 0 0 0.3rem;
`;

const BotanicalName = styled.p`
  font-size: 1rem;
  color: #555;
  font-style: italic;
  margin: 0;
`;

export default function Card({ name, botanicalName, imageUrl }) {
  return (
    <StyledCard>
      <ImageWrapper>
        <Image
          src={imageUrl}
          alt={`Image of ${name}`}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 30rem"
        />
      </ImageWrapper>
      <Name>{name}</Name>
      <BotanicalName>{botanicalName}</BotanicalName>
    </StyledCard>
  );
}
