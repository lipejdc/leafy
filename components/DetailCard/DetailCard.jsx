import Image from "next/image";
import * as styles from "./styles";

export default function DetailCard({ plant }) {
  return (
    <styles.StyledDetailCard>
      <styles.ImageWrapper>
        <Image
          src={plant.imageUrl}
          alt={plant.name}
          width={400}
          height={300}
          style={{ objectFit: "cover", borderRadius: "1rem" }}
          priority
        />
      </styles.ImageWrapper>
      <styles.Details>
        <h1>{plant.name}</h1>
        <h3>
          <em>[{plant.botanicalName}]</em>
        </h3>
        <ul>
          <li>
            <strong>Water Need:</strong> {plant.waterNeed}
          </li>
          <li>
            <strong>Light Need:</strong> {plant.lightNeed}
          </li>
          <li>
            <strong>Fertiliser Season:</strong>{" "}
            {plant.fertiliserSeason?.join(", ")}
          </li>
        </ul>
        <p>{plant.description}</p>
      </styles.Details>
    </styles.StyledDetailCard>
  );
}
