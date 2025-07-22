import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    --color-bg: #f6fff8;
    --color-primary: #2e7d32;
    --color-accent: #81c784;
    --color-text: #222;
    --color-border: #1b5e20;
    --color-white: #fff;
  }

    body {
    background: var(--color-bg);
    color: var(--color-text);
    font-family: 'Inter', Arial, sans-serif;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

input, select, textarea {
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    color: var(--color-text);
    font-family: inherit;
    padding: 0.5rem;
    margin-bottom: 0.8rem;
}

  input:focus, select:focus, textarea:focus {
    border-color: var(--color-primary);
    outline: none;
  }

  label {
    color: var(--color-primary);
  }

  button {
    background: var(--color-primary);
    color: var(--color-white);
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1.2rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  button:hover, button:focus {
    background: var(--color-accent);
    color: var(--color-text);
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
  }
`;
