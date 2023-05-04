import { RouterType } from "../models/router";
import { Navigate } from "react-router-dom";
import NotFound from "./NotFound";
import Error from "./Error";
import Home from "./Home";
import OrdersList,  { retrieveOrders } from "./orders-management/OrdersList";
import OrderDetail, { retrieveOrder } from "./orders-management/OrderDetail";

const pagesData: RouterType[] = [
    {
        path: "/",
        element: <Home />,
        title: "home",
    },
    {
        path: "orders",
        element: <OrdersList />,
        title: "orders-list",
        loader: retrieveOrders
    },
    {
        path: "orders/:id",
        element: <OrderDetail />,
        title: "order-detail",
        loader: retrieveOrder
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