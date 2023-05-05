import { RouterType } from "../models/router";
import { Navigate } from "react-router-dom";
import NotFound from "./NotFound";
import Error from "./Error";
import Home from "./Home";
import OrdersList from "./orders-management/OrdersList";
import OrderDetail, { retrieveOrder } from "./orders-management/OrderDetail";
import OrderCreate from "./orders-management/OrderCreate";

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
    },
    {
        path: "orders/create",
        element: <OrderCreate />,
        title: "create-order"
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