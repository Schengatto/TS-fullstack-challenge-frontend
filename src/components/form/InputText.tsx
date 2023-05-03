import React, { FunctionComponent, InputHTMLAttributes, LegacyRef } from "react";
import styled from "styled-components";
import { toPascalCase } from "../../utils/string-utils";

const Component = styled.div`
.input-text__input-group
{
    position: relative;
    padding: 0;
    margin: 0;

    input
    {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #c9cbcd;
        padding: 1.25rem 0.75rem 0.5rem;
        font-size: 1rem;

        &:focus {
            border-color: #191238;
        }
    }
    label
    {
        position: absolute;
        top: 0.75rem;
        left: 0.75rem;
        font-size: 1rem;
        color: #666;
        transition: 0.3s;
        pointer-events: none;

        &.valued {
            font-size: 0.75rem;
            top: 5px;
            color: #777188;
        }
    }
    input:focus + label
    {
        font-size: 0.75rem;
        top: 5px;
        color: #777188;
    }
}
.input-text__description {
    padding: 0.25rem 0;
    font-size: 0.75rem;
}
`;

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type?: "text" | "number" | "email" | "password";
    description?: string;
    value?: string | number;
}

const InputText: FunctionComponent<InputTextProps> = React.forwardRef<HTMLInputElement, InputTextProps>(({ value, label, type, description, ...rest }, ref: LegacyRef<HTMLInputElement>) => {

    const styleClass = value !== undefined ? "valued" : "";

    return (
        <Component>
            <div
                className="input-text__input-group"
                data-test={`InputText__${toPascalCase(label)}`}>
                <input
                    ref={ref}
                    id={label}
                    type={type ?? "text"}
                    value={value} {...rest}
                    data-test="InputText_Input" />
                <label
                    className={styleClass}
                    htmlFor={label}
                    data-test="InputText_Label">
                    {label}
                </label>
            </div>
            {description && <div className="input-text__description">{description}</div>}
        </Component>
    );
});

export default InputText;