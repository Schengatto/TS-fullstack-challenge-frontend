import { FunctionComponent } from "react";
import { RouterProvider } from "react-router-dom";
import styled from "styled-components";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Router from "./pages/router";

const MainContainer = styled.main`
  margin: 2rem 0;
`;

const App: FunctionComponent = () => {


    return (
        <>
            <Header />
            <MainContainer>
                <RouterProvider router={Router} />
            </MainContainer>
            <Footer />
        </>
    );
};

export default App;
