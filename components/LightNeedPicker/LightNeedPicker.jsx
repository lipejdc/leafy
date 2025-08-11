import { Sun } from "lucide-react";
import { Radiogroup, RadioButton } from "./styles";

const lightLevels = ["Shade", "Partial Shade", "Full Sun"];

export default function LightNeedPicker({ value, onChange }) {
  return (
    <Radiogroup role="radiogroup" aria-label="Light need">
      {lightLevels.map((level, index) => {
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
            <Sun
              size={28}
              fill={index <= lightLevels.indexOf(value) ? "gold" : "none"}
              color={index <= lightLevels.indexOf(value) ? "gold" : "#ccc"}
            />
          </RadioButton>
        );
      })}
    </Radiogroup>
  );
}
