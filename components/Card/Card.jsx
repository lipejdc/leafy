import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MarkAsOwnedButton from "../MarkAsOwnedButton/MarkAsOwnedButton";
import { Sun, Droplet } from "lucide-react";
import {
  StyledCard,
  ImageWrapper,
  Name,
  BotanicalName,
  WaterNeedWrapper,
  LightNeedWrapper,
} from "./styles";

export default function Card({ plant, toggleOwned }) {
  const { data: session } = useSession();
  const { name, botanicalName, imageUrl, _id, isOwned, lightNeed, waterNeed } = plant;

  const fillCount = {
    "Full Sun": 3,
    "Partial Shade": 2,
    Shade: 1,
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

  const waterFillCount = {
    High: 3,
    Medium: 2,
    Low: 1,
  };
  const waterFilled = waterFillCount[waterNeed] || 0;
  const waterIcons = [0, 1, 2].map((i) => (
    <Droplet
      key={i}
      fill={i < waterFilled ? "#2196f3" : "none"}
      color={i < waterFilled ? "#2196f3" : "#ccc"}
      size={20}
    />
  ));

  return (
    <StyledCard>
      {session && (
        <MarkAsOwnedButton
          isOwned={isOwned}
          onClick={() => toggleOwned(_id, !isOwned)}
        />
      )}
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
        <WaterNeedWrapper>{waterIcons}</WaterNeedWrapper>
      </Link>
    </StyledCard>
  );
}
