import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

const NotFound: FunctionComponent = () => {
    return (
        <div>
            <h2>Element not found...</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
};

export default NotFound;