import styled from "styled-components";

const StyledDetailCard = styled.section`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  max-width: 900px;
  width: 100%;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  h1 {
    margin-bottom: 0.2em;
  }

  h3 {
    color: #888;
    font-weight: normal;
    margin-top: 0em;
  }

  @media (min-width: 800px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  aspect-ratio: 4 / 3;
  border-radius: 1rem;
  overflow: hidden;
  flex-shrink: 0;

  @media (min-width: 800px) {
    width: 400px;
    height: 300px;
    margin-right: 2rem;
  }
`;

const Details = styled.div`
  width: 100%;
`;