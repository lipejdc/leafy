import styled from "styled-components";

export const FormContainer = styled.form`
  display: grid;
  gap: 0.3rem;
  max-width: 400px; // limits the width of the form
  margin: 3rem auto;
  width: 100%; // allows it to shrink on small screens
`;
export const PreviewWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1; // ensures a square aspect ratio (optional, for extra safety)
  object-fit: cover; // crops the image to fill the square
  border-radius: 8px;
  border: 1px solid grey;
  display: block;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background: rgba(147, 136, 136, 0.85);
  color: black;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  padding: 0;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
`;
