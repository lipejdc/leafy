import styled from "styled-components";
import { Search } from "lucide-react";

const Wrapper = styled.div`
  position: relative;
  margin: 1rem 2rem;
  max-width: 30rem;
  width: 100%;
`;

const Icon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 1.2rem;
  transform: translateY(-50%);
  pointer-events: none;
  color: #888;
`;

const Input = styled.input`
  width: 100%;
  padding-left: 2.2rem;
`;

export default function SearchBar({ searchQuery, onChange }) {
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
