import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";

const Component = styled.select`
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: 0.35rem 0.85rem;
    border: 1px solid #b7b9bb;
    display: flex;

    &:focus-within {
        border: 1px solid #191238;
        box-sizing: border-box;
    }
`;

export interface Item {
    label: string;
    value: string | number;
}

export interface SelectProps {
    items: Item[];
    onChange: () => void;
}

const Select: FunctionComponent<SelectProps> = ({ items, onChange }) => {
    return (
        <Component onChange={(e) => onChange.bind(null, e.target.value)}>
            {items.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
        </Component>
    );
};

export default Select;