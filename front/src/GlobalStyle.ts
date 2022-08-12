import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    body{
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        font-family: 'Noto Sans KR', sans-serif;
        background-color:#404A5C;
        color: #a8abaf;

        * {
            color: #a8abaf;
        }
    };
`;

export default GlobalStyle;
