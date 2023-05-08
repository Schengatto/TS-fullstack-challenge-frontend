import { FunctionComponent, useEffect } from "react";
import { Link, useRouteError, useNavigate } from "react-router-dom";
import { NotFoundError } from "shared/models/error";
import styled from "styled-components";

const Component = styled.div`
        position: fixed;
        top: 40%;
        width: 100%;
        font-variant: small-caps;
        text-align: center;
`;

const Error: FunctionComponent = () => {
    const navigate = useNavigate();
    const error = useRouteError();

    useEffect(() => {
        if (error instanceof NotFoundError) {
            navigate("/not-found");
        }
    }, [error, navigate]);

    return (
        <Component>
            <img height="80" src={require("../assets/images/error.png")} alt="error" className="animate__animated animate__bounceIn" />
            <div>
                <h2>Oops! Something went wrong...</h2>
                <p>
                    <Link to="/" data-test="Error__Link__home">Go to the home page</Link>
                </p>
            </div>
        </Component>
    );
};

export default Error;