import { FunctionComponent } from "react";
import styled from "styled-components";

const Component = styled.div`

    .footer__content {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #1a1238;
        color: #fdefcc;
        font-variant: small-caps;
        text-align: center;
        z-index: 10;
    }
`;

const Footer: FunctionComponent = () => {
    return (
        <Component>
            <div className="footer__content">Made in React with ❤️ by Enrico Schintu</div>
        </Component>
    );
};

export default Footer;