import { createGlobalStyle } from 'styled-components/macro';

export const NunitoFont =
  "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";

export const COLORS = {
  primary: '#686de0',
  primarySemiDark: '#4834d4',
  primaryDark: '#30336b',
  disable: '#535c68',
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }


  body {
    width: 100%;
    height: max-content;
    background-color: ${COLORS.primarySemiDark};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body, input, button {
    font-family: ${NunitoFont};
  }
`;

export default GlobalStyle;
