import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`

    :root {
        --color-primary-purple: #7380ec;
        --color-dark-variant : #677483;
        --color-downIcon-red : #d92b2ba6;
        --color-upIcon-green :#73c177;
        --color-flatIcon-blue : #5ea6dfd9;
        --color-iconCard-purple: #896584;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Nunito', sans-serif;
        scrollbar-width:thin;
        scrollbar-color:rgba(155,155,155,0.5) transparent;
        overflow: hidden;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    *:focus {
     outline: none;
    }

    *::-webkit-scrollbar{
        width: 5px;
        height: 4px;
    }

    *::-webkit-scrollbar-track{
        background: transparent;
    }

    *::-webkit-scrollbar-thumb{
        background-color:rgba(155,155,155,0.5);
        border-radius: 20px;
        border:transparent;
    }
`;

export default GlobalStyle;