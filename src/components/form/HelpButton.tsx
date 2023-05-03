import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Component = styled.div`
    display: flex;

    .icon {
        background-color: #191238;
        text-align: center;
        color: #dfdede;
        border-radius: 50%;
        cursor: pointer;

        &.normal {
            font-size: 16px;
            width: 1.25rem;
            height: 1.25rem;
            padding: 0.25rem;
        }

        &.small {
            font-size: 12px;
            width: 0.85rem;
            height: 0.85rem;
            padding: 0.125rem;
        }

        &:hover {
            background-color: #777188;
        }
    }

    .label {
        &.normal {
            font-size: 16px;
            margin-left: 0.25rem;
            margin-top: 0.25rem;
        }

        &.small {
            font-size: 12px;
            margin-left: 0.15rem;
            margin-top: 0.15rem;
        }
    }
`;

export interface HelpProps {
    size?: "normal" | "small";
    label?: string;
    onClick?: () => void;
}

const HelpButton: FunctionComponent<HelpProps> = ({ label, size, onClick }) => {
    return (
        <Component onClick={onClick}>
            <div className={`icon ${size ?? "normal"}`}>?</div>
            <div className={`label ${size ?? "normal"}`}>{label ?? "Help"}</div>
        </Component>
    );
};

export default HelpButton;