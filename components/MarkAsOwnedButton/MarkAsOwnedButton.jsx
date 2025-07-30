import { CheckCircle, Circle } from "lucide-react";
import * as styles from "./styles";

export default function MarkAsOwnedButton({ isOwned, onClick }) {
  return (
    <styles.Button onClick={onClick} aria-label="Mark as owned" $isOwned={isOwned}>
      {isOwned ? (
        <>
          <CheckCircle />
          <styles.OwnershipLabel>Owned</styles.OwnershipLabel>
        </>
      ) : (
        <>
          <Circle />
          <styles.OwnershipLabel>Not Owned</styles.OwnershipLabel>
        </>
      )}
    </styles.Button>
  );
}
