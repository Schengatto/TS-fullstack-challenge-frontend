import { RouterType } from "../models/router";
import { Navigate } from "react-router-dom";
import NotFound from "./NotFound";
import Error from "./Error";

const pagesData: RouterType[] = [
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
        element: <Navigate to="/metrics" />,
        title: "default"
    }
];

export default pagesData;