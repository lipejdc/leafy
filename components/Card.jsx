import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import MarkAsOwnedButton from "./MarkAsOwnedButton";
import { Sun } from "lucide-react";

const StyledCard = styled.article`
  position: relative;
  width: 100%;
  max-width: 30rem;
  border: 1px solid #ccc;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.1);
  text-align: center;
  padding-bottom: 1rem;
`;

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
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

const LightNeedWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  margin-top: 0.5rem;
`;

export default function Card({ plant, toggleOwned }) {
  const { name, botanicalName, imageUrl, _id, isOwned, lightNeed } = plant;

 const fillCount = {
    "Full Sun": 3,
    "Partial Shade": 2,
    "Shade": 1,
  };

  const filled = fillCount[lightNeed] || 0;

  const lightIcons = [0, 1, 2].map((i) => (
    <Sun
      key={i}
      fill={i < filled ? "gold" : "none"}
      color={i < filled ? "gold" : "#ccc"}
      size={20}
    />
  ));

  return (
    <StyledCard>
      <MarkAsOwnedButton
        isOwned={isOwned}
        onClick={() => toggleOwned(_id, isOwned)}
      />
      <Link href={`plants/${_id}`}>
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
        <LightNeedWrapper>{lightIcons}</LightNeedWrapper>
      </Link>
    </StyledCard>
  );
}
