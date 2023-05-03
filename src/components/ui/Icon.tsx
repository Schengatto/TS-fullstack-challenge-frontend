import React, { FunctionComponent } from "react";
import styled from "styled-components";

export type IconType = "search" | "prev" | "next";

const StyledIcon = styled.svg<{ color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color || "currentColor"};
`;

export interface IconProps {
    color?: string;
    size?: number;
    type: IconType;
}

const Icon: FunctionComponent<IconProps> = ({ size, type, ...rest }) => {
    switch (type) {
        case "search":
            return (
                <StyledIcon 
                    {...rest}
                    width={size}
                    height={size}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    data-test="Icon__Search">
                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                        fill="currentColor" />
                </StyledIcon>
            );
        case "prev":
            return (
                <StyledIcon
                    {...rest}
                    width={size}
                    height={size}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    data-test="Icon__Prev">
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </StyledIcon>
            );
        case "next":
            return (
                <StyledIcon
                    {...rest}
                    width={size}
                    height={size}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    data-test="Icon__Next">
                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                </StyledIcon>
            );
    }
};

export default Icon;