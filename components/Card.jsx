import styled from "styled-components";

const StyledCard = styled.article`
  width: 30rem;
  flex: 0 0 auto;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #fafafa;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  box-sizing: border-box;
`;


const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
        <Image src={imageUrl} alt={`Image of ${name}`} />
      </ImageWrapper>
      <Name>{name}</Name>
      <BotanicalName>{botanicalName}</BotanicalName>
    </StyledCard>
  );
}
