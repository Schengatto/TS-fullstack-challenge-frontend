import { FunctionComponent} from "react";
import styled from "styled-components";

const Component = styled.select`
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: 1rem 0.75rem 0.75rem;
    border: 1px solid #b7b9bb;
    display: flex;
    background-color: transparent;
    font-size: 1rem;
    width: 100%;

    &:focus-within {
        border: 1px solid #191238;
        box-sizing: border-box;
    }
`;

export interface Item {
    label: string;
    value: any;
}

export interface SelectProps {
    items: Item[];
    onChange: (value: any) => void;
}

const Select: FunctionComponent<SelectProps> = ({ items, onChange }) => {
    const handleChange = (e: any) => {
        onChange(e.target.value);
    };

    return (
        <Component onChange={handleChange}>
            {items.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
        </Component>
    );
};

export default Select;