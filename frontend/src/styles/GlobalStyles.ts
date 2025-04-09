import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');

  :root {
    --primary-color: #5BA3EB;
    --primary-dark: #4A93DB;
    --background-light: #F0F8FF;
    --background-dark: #1E2952;
    --text-light: #333333;
    --text-dark: #FFFFFF;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: all 0.3s ease;
  }

  body[data-theme='dark'] {
    background-color: var(--background-dark);
    color: var(--text-dark);
  }

  body[data-theme='light'] {
    background-color: var(--background-light);
    color: var(--text-light);
  }

  * {
    box-sizing: border-box;
  }

  button {
    font-family: inherit;
  }
`;

export default GlobalStyles; 