import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { PageInfo } from "../../models/pagination";
import Icon from "./Icon";

const Component = styled.div`
    font-size: 8pt;
    position: relative;
    width: 100%;

    .page-navigator__wrapper {
        display: inline-flex;
        position: absolute;
        top: 0;
        right: 0;

        select {
            background-color: transparent;
            border: 0;
            margin-top: 0px;
            font-size: 8pt;
            font-weight: bold;
            cursor: pointer;
        }

        .page-navigator__nav {
            font-size: 8pt;
            margin: 0 0.25rem;
            display: inline-flex;

            svg {
                cursor: pointer;
            }
        }
    }
`;

export interface PageNavigatorProps extends PageInfo {
    pageCount: number;
    onPageChange: (pageInfo: PageInfo) => void
}

const PageNavigator: FunctionComponent<PageNavigatorProps> = ({ pageCount, pageNumber, pageSize, onPageChange }) => {
    const pageOptions = [ 5, 10, 20, 50 ];

    const handlePageSizeChange = (value: string) => {
        onPageChange({ pageSize: Number(value), pageNumber: 1 });
    };

    const handleMovePrevPage = () => {
        if (pageNumber === 1) return;
        onPageChange({ pageSize, pageNumber: pageNumber - 1 });
    };

    const handleMoveNextPage = () => {
        if (pageNumber === pageCount) return;
        onPageChange({ pageSize, pageNumber: pageNumber + 1 });
    };

    return (
        <Component>
            <div className="page-navigator__wrapper">
                <div>Page records:</div>
                <select
                    value={pageSize}
                    onChange={(e) => handlePageSizeChange(e.target.value)}
                    data-test="PageNavigator__Select__PageSize">
                    {pageOptions.map((option, index) => <option key={index} value={option}>{option}</option>)}
                </select>
                <div className="page-navigator__nav">
                    <div onClick={handleMovePrevPage} data-test="PageNavigator__Button__Prev">
                        <Icon type="prev" size={10} />
                    </div>
                    <div className="page-navigator__status" data-test="PageNavigator__Status">
                        <strong>{pageNumber}</strong> of {pageCount}
                    </div>
                    <div onClick={handleMoveNextPage} data-test="PageNavigator__Button__Next">
                        <Icon type="next" size={10} />
                    </div>
                </div>
            </div>
        </Component>
    );
};

export default PageNavigator;