import { RouterType } from "../models/router";
import { Navigate } from "react-router-dom";
import NotFound from "./NotFound";
import Error from "./Error";
import Home from "./Home";
import OrdersList from "./orders-management/OrdersList";
import OrderDetail, { retrieveOrder } from "./orders-management/OrderDetail";
import OrderCreate from "./orders-management/OrderCreate";
import PlanCreate from "./plan/PlanCreate";

const pagesData: RouterType[] = [
    {
        path: "/",
        element: <Home />,
        title: "home",
    },
    {
        path: "order",
        element: <OrdersList />,
        title: "orders-list",
    },
    {
        path: "order/create",
        element: <OrderCreate />,
        title: "create-order"
    },
    {
        path: "order/:id",
        element: <OrderDetail />,
        title: "order-detail",
        loader: retrieveOrder
    },
    {
        path: "plan/create",
        element: <PlanCreate />,
        title: "create-plan"
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