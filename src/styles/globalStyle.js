import { css } from '@emotion/react';
import variables from './variables';

const globalStyle = css`
  /* Inject variable here */
  ${variables}

  * {
    box-sizing: border-box;
  }

  /* custom focus outline */
  *:focus {
    outline: 0;
    box-shadow: 0 0 4px 1px var(--dark-theme-bg-secondary);
  }

  html {
    margin: 0;
    padding: 0;
    font-family: var(--body-font-family-primary);
    font-size: 16px;
  }

  body {
    background-color: var(--white);
  }

  button,
  select {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 10px 0;
    font-weight: 600;
    color: var(--black);
    line-height: 1.2em;
  }
  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
  }
  input,
  textarea {
    border-radius: 0;
    outline: 0;
    &:focus {
      outline: 0;
    }
    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }
`;

export default globalStyle;
