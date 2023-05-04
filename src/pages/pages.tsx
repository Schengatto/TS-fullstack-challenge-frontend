import { RouterType } from "../models/router";
import { Navigate } from "react-router-dom";
import NotFound from "./NotFound";
import Error from "./Error";
import Home from "./Home";
import ListOrders,  { retrieveOrders } from "./orders-management/OrdersList";

const pagesData: RouterType[] = [
    {
        path: "/",
        element: <Home />,
        title: "home",
    },
    {
        path: "/orders-management",
        element: <ListOrders />,
        title: "list-orders",
        loader: retrieveOrders
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
        element: <Navigate to="/not-found" />,
        title: "default"
    }
];

export default pagesData;