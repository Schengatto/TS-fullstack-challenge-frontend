import { FunctionComponent, useEffect } from "react";
import { Link, useRouteError, useNavigate } from "react-router-dom";
import { NotFoundError } from "../models/error";

const Error: FunctionComponent = () => {
    const navigate = useNavigate();
    const error = useRouteError();

    useEffect(() => {
        if (error instanceof NotFoundError) {
            navigate("/not-found");
        }
    }, [ error, navigate ]);

    return (
        <div>
            <h2>Oops! Something went wrong...</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
};

export default Error;