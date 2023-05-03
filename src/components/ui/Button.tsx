import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { toPascalCase } from "../../utils/string-utils";

const Component = styled.button`
    cursor: pointer;
    display: block;
    width: 100%;
    color: #dfdede;
    background-color: #191238;
    padding: 0.75em;
    border: 0;

    &:hover {
        background-color: #777188;
    }

    &:disabled {
        color: #c4c2ca;
        background-color: #F1F2F3;
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