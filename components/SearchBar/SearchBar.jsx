import { Search } from "lucide-react";
import { Wrapper, Icon, Input } from "./styles";
import React from "react";

function SearchBar({ searchQuery, onChange }) {
  return (
    <Wrapper>
      <Icon>
        <Search size={18} strokeWidth={1.8} />
      </Icon>
      <Input
        type="text"
        placeholder="Search by name or botanical name..."
        value={searchQuery}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search plants"
      />
    </Wrapper>
  );
}

export default React.memo(SearchBar);
