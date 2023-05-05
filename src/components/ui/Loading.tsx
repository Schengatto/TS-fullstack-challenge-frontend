import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Component = styled.div`
    position: fixed;
    z-index: 999;
    background-color: #f2f0f0db;
    color: var(--primary-text-color);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    text-align: center;

    h1 {
        position: absolute;
        top: 80%;
        width: 100%;
        margin: auto;
    }
`;

const Loading: FunctionComponent = () => (<Component><h1>Loading...</h1></Component>);

export default Loading;