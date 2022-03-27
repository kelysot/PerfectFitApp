import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`

    :root {
        --color-primary-purple: #7380ec;
        --color-dark-variant : #677483;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Nunito', sans-serif;
    }
`;

export default GlobalStyle;