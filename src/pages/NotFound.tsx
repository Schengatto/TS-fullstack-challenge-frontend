import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Component = styled.div`
        position: fixed;
        top: 40%;
        width: 100%;
        font-variant: small-caps;
        text-align: center;
`;

const NotFound: FunctionComponent = () => {
    return (
        <Component>
            <h2>Element not found...</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </Component>
    );
};

export default NotFound;