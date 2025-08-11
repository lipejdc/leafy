import { CheckCircle, Circle } from "lucide-react";
import { Button, OwnershipLabel } from "./styles";

export default function MarkAsOwnedButton({ isOwned, onClick }) {
  return (
    <Button onClick={onClick} aria-label="Mark as owned" $isOwned={isOwned}>
      {isOwned ? (
        <>
          <CheckCircle />
          <OwnershipLabel>Owned</OwnershipLabel>
        </>
      ) : (
        <>
          <Circle />
          <OwnershipLabel>Not Owned</OwnershipLabel>
        </>
      )}
    </Button>
  );
}
