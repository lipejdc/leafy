import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  margin: 1rem 2rem;
  max-width: 30rem;
  width: 100%;
`;

export const Icon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 1.2rem;
  transform: translateY(-50%);
  pointer-events: none;
  color: #888;
`;

export const Input = styled.input`
  width: 100%;
  padding-left: 2.2rem;
`;