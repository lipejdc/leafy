import Image from "next/image";
import Link from "next/link";
import MarkAsOwnedButton from "./MarkAsOwnedButton";
import { Sun, Droplet } from "lucide-react";
import * as styles from "./styles";

export default function Card({ plant, toggleOwned }) {
  const { name, botanicalName, imageUrl, _id, isOwned, lightNeed, waterNeed } = plant;

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
    <styles.StyledCard>
      <MarkAsOwnedButton
        isOwned={isOwned}
        onClick={() => toggleOwned(_id, isOwned)}
      />
      <Link href={`plants/${_id}`}>
        <styles.ImageWrapper>
          <Image
            src={imageUrl}
            alt={`Image of ${name}`}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 30rem"
          />
        </styles.ImageWrapper>
        <styles.Name>{name}</styles.Name>
        <styles.BotanicalName>{botanicalName}</styles.BotanicalName>
        <styles.LightNeedWrapper>{lightIcons}</styles.LightNeedWrapper>
        <styles.WaterNeedWrapper>{waterIcons}</styles.WaterNeedWrapper>
      </Link>
    </styles.StyledCard>
  );
}
