import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html {

        @media (max-width: 1080px) {
            font-size: 93.75%;
        }
        @media (max-width: 720px) {
            font-size: 87.5%;
        }
    }
    body {
        z-index: 4000;
        margin: 0;    
        background-color: #040143;
        padding: 0;    
        font-family: sans-serif;    
        transition: all 0.25s linear;
        -webkit-font-smoothing: antialiased;
    }
    body, input, textarea, button {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        outline: 0px;
        background: rgb(18, 18, 20);
        border: 2px solid rgb(40, 39, 44);
        border-radius: 5px;
        height: 50px;
        padding: 15px 21px;
        color: rgb(255, 255, 255);
        font-size: 17px;
        width: 100%;
        transition: border 0.2s ease 0s;
    }
    button {
        cursor: pointer;
    }
    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }
    button:hover, a:hover  {
        filter: brightness(90%);
    }
    a {
        color: var(--white);
    }
`