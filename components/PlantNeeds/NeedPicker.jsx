
import { Sun, Droplet } from "lucide-react";
import { Radiogroup, RadioButton } from "./styles";

export default function NeedPicker({ type, levels, value, onChange }) {
  const Icon = type === "water" ? Droplet : Sun;
  const activeColor = type === "water" ? "deepskyblue" : "gold";

  return (
    <Radiogroup role="radiogroup" aria-label={`${type} need`}>
      {levels.map((level, index) => {
        const isSelected = value === level; // keep exact same selection logic

        return (
          <RadioButton
            key={level}
            type="button"
            onClick={() => onChange(level)}
            aria-checked={isSelected}
            role="radio"
            aria-label={level}
          >
            <Icon
              size={28}
              fill={index <= levels.indexOf(value) ? activeColor : "none"} // same progressive fill
              color={index <= levels.indexOf(value) ? activeColor : "#ccc"} // same stroke logic
            />
          </RadioButton>
        );
      })}
    </Radiogroup>
  );
}
