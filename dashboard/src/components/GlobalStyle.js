import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`

    :root {
        --color-primary-purple: #7380ec;
        --color-dark-variant : #677483;
        --color-downIcon-red : #d92b2ba6;
        --color-upIcon-green :#73c177;
        --color-iconCard-purple: #896584;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Nunito', sans-serif;
    }
`;

export default GlobalStyle;