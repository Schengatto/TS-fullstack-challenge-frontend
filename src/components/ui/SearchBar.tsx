import { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import Icon from "./Icon";

const Component = styled.div`
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;

    border: 1px solid #b7b9bb;
    display: flex;

    &:focus-within {
        border: 1px solid #191238;
        box-sizing: border-box;
    }

    input {
        border: none;
        width: 100%;
        padding: 0.35rem 0 0.35rem 0.5rem;
        outline: none;

        &:focus {
            border: none;
        }
    }

    svg {
        margin: 0.35rem 0.5rem;
    }
`;

export interface SearchBarProps {
    placeHolder?: string;
    onSearch: (terms: string) => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({ placeHolder, onSearch }) => {
    const [ searchTerm, setSearchTerm ] = useState(null);

    const handleSearch = (event: any) => setSearchTerm(event.target.value);

    useEffect(() => {
        if (searchTerm === null) return;
        const timer = setTimeout(() => {
            onSearch(searchTerm);
        }, 250);
        return () => clearTimeout(timer);
    }, [ searchTerm, onSearch ]);

    return (
        <Component>
            <input
                type="text"
                placeholder={placeHolder}
                onChange={handleSearch}
                data-test="SearchBar__Input" />
            <Icon type="search" size={12} />
        </Component>
    );
};

export default SearchBar;