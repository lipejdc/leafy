import { Droplet } from "lucide-react";
import { Radiogroup, RadioButton } from "./styles";

const waterLevels = ["Low", "Medium", "High"];

export default function WaterNeedPicker({ value, onChange }) {
  return (
    <Radiogroup role="radiogroup" aria-label="Water need">
      {waterLevels.map((level, index) => {
        const isSelected = value === level;
        return (
          <RadioButton
            key={level}
            type="button"
            onClick={() => onChange(level)}
            aria-checked={isSelected}
            role="radio"
            aria-label={level}
          >
            <Droplet
              size={28}
              fill={index <= waterLevels.indexOf(value) ? "deepskyblue" : "none"}
              color={index <= waterLevels.indexOf(value) ? "deepskyblue" : "#ccc"}
            />
          </RadioButton>
        );
      })}
    </Radiogroup>
  );
}
