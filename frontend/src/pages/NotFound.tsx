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
            <img height="80" src={require("../assets/images/404.png")} alt="error" className="animate__animated animate__zoomIn" />
            <div>
                <h2>Element not found...</h2>
                <p>
                    <Link to="/" data-test="NotFound__Link__home">Go to the home page</Link>
                </p>
            </div>
        </Component>
    );
};

export default NotFound;