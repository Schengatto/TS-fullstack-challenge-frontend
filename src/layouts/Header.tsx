import { FunctionComponent } from "react";
import styled from "styled-components";

const Component = styled.div`
    .header__content {
        top: 0;
        padding: 0 1rem;
        position: fixed;
        width: 100%;
        background-color: white;
        color: #1a1238 ;
        font-variant: small-caps;
        z-index: 10;
        font-size: 16pt;
    }
`;

const Header: FunctionComponent = () => {
    return (
        <Component>
            <div className="header__content">Frontend challange</div>
        </Component>
    );
};

export default Header;