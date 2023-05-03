import { RouterType } from "../models/router";
import { Navigate } from "react-router-dom";
import NotFound from "./NotFound";
import Error from "./Error";
import Home from "./Home";

const pagesData: RouterType[] = [
    {
        path: "/",
        element: <Home />,
        title: "home"
    },
    {
        path: "not-found",
        element: <NotFound />,
        title: "404"
    },
    {
        path: "error",
        element: <Error />,
        title: "error"
    },
    {
        path: "*",
        element: <Navigate to="/" />,
        title: "default"
    }
];

export default pagesData;