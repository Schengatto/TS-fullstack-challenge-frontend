import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { toPascalCase } from "../../utils/string-utils";

const Component = styled.button`
    cursor: pointer;
    display: block;
    width: 100%;
    color: var(--primary-text-color);
    background-color: var(--primary-bg-color);
    padding: 0.75em;
    border: 0;
    font-size: 12pt;
    font-variant: small-caps;

    &:hover {
        background-color: var(--primary-hover-bg-color);
        color: var(--primary-hover-text-color);
    }

    &:disabled {
        color: var(--primary-disabled-text-color);
        background-color: var(--primary-disabled-bg-color);
        cursor: default;
    }
`;

export interface ButtonProps {
    label: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({ label, disabled, type, onClick: handleClick }) => {
    return (
        <Component
            type={type ?? "button"}
            onClick={handleClick}
            disabled={disabled}
            data-test={`Button__${toPascalCase(label)}`}>
            {label}
        </Component>
    );
};

export default Button;