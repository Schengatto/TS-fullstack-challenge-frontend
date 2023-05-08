import { FunctionComponent } from "react";
import styled from "styled-components";

const Component = styled.div`
    .header__content {
        top: 0;
        padding: 0 1rem;
        position: fixed;
        width: 100%;
        background-color: #ffffff9a;
        color: #1a1238 ;
        font-variant: small-caps;
        z-index: 10;
        font-size: 16pt;
    }
`;

const Header: FunctionComponent = () => {
    return (
        <header>
            <Component data-test="Header__Container">
                <div className="header__content">Frontend challenge</div>
            </Component>
        </header>
    );
};

export default Header;