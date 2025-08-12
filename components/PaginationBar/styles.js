import styled from "styled-components";

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  padding: 1rem 2rem;

  border-radius: 1.2rem;

  font-size: 1.25rem;
  margin: 2rem auto;
  max-width: 900px;
`;

export const Select = styled.select`
  font-size: 1.1rem;
  padding: 0.3rem 1.2rem;
  border-radius: 0.7rem;
  border: 2px solid var(--color-border);
  background: var(--color-bg);
  font-family: inherit;
`;

export const PageNumbers = styled.span`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const PageBtn = styled.button`
  background: ${({ active }) => (active ? "var(--color-accent)" : "none")};
  color: ${({ active }) => (active ? "var(--color-primary)" : "inherit")};
  border: none;
  border-radius: 0.5rem;
  padding: 0.2rem 0.7rem;
  font-size: 1.1rem;
  cursor: pointer;
  font-family: inherit;
  &:hover {
    background: var(--color-accent);
    color: var(--color-primary);
  }
`;
