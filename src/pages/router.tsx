import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { RouterType } from "../models/router";
import Error from "./Error";
import pages from "./pages";

const router = createBrowserRouter(
    createRoutesFromElements(
        pages.map(({ path, title, element, loader }: RouterType) => {
            return <Route key={title} path={`/${path}`} element={element} loader={loader} errorElement={<Error />} />;
        })));

export default router;