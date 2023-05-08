import { FunctionComponent } from "react";
import styled from "styled-components";

export const Component = styled.div`
    text-align: center;
    font-variant: small-caps;
`;

export interface PageTitleProps {
    title: string;
}

const PageTitle: FunctionComponent<PageTitleProps> = ({ title, ...rest }) => {
    return (<Component {...rest}><h1>{title}</h1></Component>);
};

export default PageTitle;