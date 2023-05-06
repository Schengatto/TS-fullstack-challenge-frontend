import { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";

const Component = styled.div`
    background-color: #ffff;
    margin: 1rem;
    border-radius: 0.25rem;

    .card__header{
        border-bottom: 2px solid #f2f0fa;
        padding: 1rem;
    }
`;

export interface CardProps {
    children: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
    className?: string;
}

const Card: FunctionComponent<CardProps> = ({ children, header, footer, className }) => {
    return (
        <Component className={className}>
            {header && <div className="card__header">{header}</div>}
            <div className="card__body">{children}</div>
            {footer && <div className="card__footer">{footer}</div>}
        </Component>
    );
};

export default Card;