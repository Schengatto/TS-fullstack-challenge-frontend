import React, { FunctionComponent, InputHTMLAttributes, LegacyRef } from "react";
import styled from "styled-components";
import { toPascalCase } from "../../utils/string-utils";

const Component = styled.div`
.text-area__input-group
{
    position: relative;
    padding: 0;
    margin: 0;

    textarea
    {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #c9cbcd;
        padding: 1.25rem 0.75rem 0.5rem;
        font-size: 1rem;
        resize: none;

        &:focus {
            border-color: #191238;
        }

        &:focus + label {
            font-size: 0.75rem;
            top: 5px;
            color: #777188;
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
}
.text-area__description {
    padding: 0.25rem 0;
    font-size: 0.75rem;
}
`;

export interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    value?: string;
    description?: string;
    required?: boolean;
}

const TextArea: FunctionComponent<TextAreaProps> = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ value, label, description, required, ...rest }, ref: LegacyRef<HTMLTextAreaElement>) => {

    const styleClass = value !== undefined ? "valued" : "";

    return (
        <Component>
            <div
                className="text-area__input-group"
                data-test={`InputText__${toPascalCase(label)}`}>
                <textarea
                    ref={ref}
                    id={label}
                    value={value} {...rest}
                    rows={3}
                    data-test="InputText_Input" />
                <label
                    className={styleClass}
                    htmlFor={label}
                    data-test="InputText_Label">
                    {label} {required && " (required)"}
                </label>
            </div>
            {description && <div className="text-area__description">{description}</div>}
        </Component>
    );
});

export default TextArea;