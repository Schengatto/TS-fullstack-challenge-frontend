import React, { FunctionComponent } from "react";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import { RouterProvider } from "react-router-dom";
import Router from "./pages/router";
import styled from "styled-components";

const MainContainer = styled.main`
  margin: 2rem 0;
`;

const App: FunctionComponent = () => {
    return (
        <div>
            <header>
                <Header />
            </header>
            <MainContainer>
                <RouterProvider router={Router} />
            </MainContainer>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default App;
