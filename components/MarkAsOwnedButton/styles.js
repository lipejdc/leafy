import styled from "styled-components";

export const Button = styled.button`
  position: absolute;
  background: none;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  padding: 0.25rem;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;

  color: ${({ $isOwned }) => ($isOwned ? "green" : "gray")};

  &:hover {
    color: ${({ $isOwned }) => ($isOwned ? "#0a8a0a" : "#666")};
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export const OwnershipLabel = styled.span`
  font-weight: 700;
  letter-spacing: 0.4px;
`;