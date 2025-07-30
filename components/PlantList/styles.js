import styled from "styled-components";

export const ListSection = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 0;
  padding: 2rem;
  margin: 0;
  list-style: none;
  justify-content: space-evenly;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: center;
  width: 30rem;
  max-width: 90vw;
`;

export const EmptyMessage = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #777;
  margin-top: 2rem;
`;