import { Search } from "lucide-react";
import * as styles from "./styles";

export default function SearchBar({ searchQuery, onChange }) {
  return (
    <styles.Wrapper>
      <styles.Icon>
        <Search size={18} strokeWidth={1.8} />
      </styles.Icon>
      <styles.Input
        type="text"
        placeholder="Search by name or botanical name..."
        value={searchQuery}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search plants"
      />
    </styles.Wrapper>
  );
}
