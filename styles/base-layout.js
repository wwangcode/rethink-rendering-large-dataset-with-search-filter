import { createGlobalStyle } from 'styled-components'

const BaseLayout = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    *, *::after, *::before {
        box-sizing: border-box;
        background-color: rgb(0,0,0);
        color: white;
        max-width: 100vw;
        height: auto;
        margin: 0;
        padding: 0;
        font-style: normal;
        text-rendering: optimizeLegibility;
    }
`;

export default BaseLayout

