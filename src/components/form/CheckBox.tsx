import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Component = styled.div`
    /* Customize the label (the container) */
    .container {
        display: block;
        position: relative;
        padding-left: 28px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        /* Hide the browser's default checkbox */
        input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
            
            /* When the checkbox is checked, add a green background */
            &:checked ~ .checkmark {
                background-color: #00e48f;
                border: 2px solid #00e48f;
            }

            &:disabled ~ .checkmark {
                background-color: #d1cfcfd5 !important;
                border: 2px solid #eee;
                cursor: default;
            }
        }

        /* Color of disabled label */
        &.text-disabled {
            color: #b4b3b3b5;
            cursor: default;
        }

        /* Create a custom checkbox */
        .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 14px;
            width: 14px;
            border: 2px solid #eee;

            /* Create the checkmark/indicator (hidden when not checked) */
            &:after {
                content: "";
                position: absolute;
                display: none;
            }
        }

        /* On mouse-over, add a grey background color */
        &:hover input ~ .checkmark {
            background-color: #ccc;
        }
    }
    
    /* Show the checkmark when checked */
    .container input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .container .checkmark:after {
        left: 4px;
        top: 0px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
`;

export interface CheckBoxProps {
    label: string;
    disabled?: boolean;
    checked?: boolean;
    onChange?: () => void;
}

const CheckBox: FunctionComponent<CheckBoxProps> = ({ label, checked, disabled, onChange }) => {
    return (
        <Component>
            <label htmlFor="label" className={`container ${disabled && "text-disabled"}`}>{label}
                <input
                    type="checkbox"
                    id={label}
                    disabled={disabled}
                    checked={checked}
                    onChange={onChange}
                />
                <span className="checkmark"></span>
            </label>
        </Component>
    );
};

export default CheckBox;