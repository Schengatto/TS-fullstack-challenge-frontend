import { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";

const Component = styled.div`
    background-color: #ffffff;
    margin: 1rem;
    border-radius: 0.25rem;

    .card__header{
        border-bottom: 2px solid #f2f0fa;
        padding: 0.5rem;
    }

    .card__body {
        padding: 0.5rem;
    }

    .card__footer{
        padding: 0.5rem;
    }
`;

export interface CardProps {
    children: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
    className?: string;
}

const Card: FunctionComponent<CardProps> = ({ children, header, footer, className, ...rest }) => {
    return (
        <Component className={className} {...rest}>
            {header && <div className="card__header">{header}</div>}
            <div className="card__body">{children}</div>
            {footer && <div className="card__footer">{footer}</div>}
        </Component>
    );
};

export default Card;