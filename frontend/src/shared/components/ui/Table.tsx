import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { PageInfo } from "../../models/pagination";
import PageNavigator from "./PageNavigator";
import SearchBar from "./SearchBar";
import { getFieldValue } from "../../utils/object-utils";

const Component = styled.div<{ bgColor?: string }>`
    background-color: ${(props) => props.bgColor || "var(--primary-bg-color)"};
    border: 5px solid ${(props) => props.bgColor || "var(--primary-bg-color)"};

    &.disabled {
        background-color: var(--primary-disabled-bg-color);
        border: 5px solid var(--primary-disabled-bg-color);
    }

    .table__pre-append {
        display: flex;
        justify-content: space-between;
        margin: 0.5rem 0;

        .table__title {
            width: 100%;
            margin: 0 0.5rem;
        }
    }

    .table {
        width: 100%;
        background-color: #ffffff;

        .table__filters {
            display: flex;
            justify-content: space-between;
            border-bottom: 2px solid #e7e5e5;
            padding: 0.5rem;
        }

        .table__table-header {
            border-bottom: 2px solid #e7e5e5;
            padding: 0.5rem;
        }

        .table__no-data {
            text-align: center;
            padding: 2rem 0;
            text-align: center;
        }

        table {
            border-spacing: 0px;
            width: 100%;

            th {
                text-align: left;
                border-bottom: 2px solid #e7e5e5;
            }

            td, th {
                padding: 0.25rem;
            }

            tbody {
                tr {
                    cursor: pointer;
                    &:hover {
                        background-color: var(--primary-hover-bg-color);
                        color: var(--primary-hover-text-color);
                    }

                    &.disabled {
                        cursor: default;
                        &:hover {
                            background-color: transparent;
                            color: inherit;
                        }
                    }
                }
            }
        }
    }
`;

export interface TableHeaderInfo {
    key: string;
    label?: string;
    parseFunction?: (value: any) => string | number;
}

export interface TableProps {
    title?: string;
    actions?: ReactNode;
    headers: TableHeaderInfo[];
    items: any[];
    searchKeys: string[];
    footer?: ReactNode;
    readonly?: boolean;
    isLoading?: boolean;
    bgColor?: string;
    emptyTableMessage?: string;
    onRowClick?: (item: any) => void;
}

const Table: FunctionComponent<TableProps> = ({ title, actions: filters, headers, items, searchKeys, footer, readonly, isLoading, bgColor, emptyTableMessage, onRowClick, ...rest }) => {
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const [pageItems, setPageItems] = useState<any[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfo>({ pageNumber: 1, pageSize: 10 });
    const [searchTerm, setSearchTerm] = useState<string>("");

    const applyFilter = (item: any, searchKey: string) => getFieldValue(item, searchKey)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    useEffect(() => {
        const matchTerms = items.filter((item: any) => searchKeys.some(key => applyFilter(item, key)));
        setFilteredItems(matchTerms);
        const from = (pageInfo.pageNumber - 1) * pageInfo.pageSize;
        const to = pageInfo.pageSize + ((pageInfo.pageNumber - 1) * pageInfo.pageSize);
        const pageItems = matchTerms.slice(from, to);
        setPageItems(pageItems);
    }, [pageInfo, items, searchKeys, searchTerm]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handlePageChange = (page: PageInfo) => setPageInfo(page);

    const pageCount = Math.max(Math.ceil(filteredItems.length / pageInfo.pageSize), 1);

    const handleRowClick = (id: string) => !readonly && onRowClick && onRowClick(id);

    const parseRow = (item: any, index: number) => (headers
        .map((header: TableHeaderInfo) => ({
            key: `${index}-${header.key}-${header.label}`,
            item,
            value: header.parseFunction
                ? header.parseFunction(item[header.key])
                : getFieldValue(item, header.key) && String(getFieldValue(item, header.key))
        }))
        .map(row => <td className="item-row" key={row.key}>{row.value}</td>));

    const emptyTable = isLoading
        ? (<div className="table__no-data" data-test="Table__Loading__message">Loading...</div>)
        : (<div className="table__no-data" data-test="Table__Empty__message">{emptyTableMessage ? emptyTableMessage : "No results"}</div>);

    return (
        <Component className={readonly ? "disabled" : ""} bgColor={bgColor} {...rest}>
            <div className="table__pre-append">
                <div className="table__title">
                    <strong>{title}</strong>
                </div>
                {pageInfo && <PageNavigator {...pageInfo} pageCount={pageCount} onPageChange={handlePageChange} />}
            </div>
            <div className="table" data-test="Table__Container">
                <div className="table__filters">
                    <div>
                        {filters}
                    </div>
                    <div>
                        <SearchBar placeHolder="Search" onSearch={handleSearch} />
                    </div>
                </div>
                {pageItems.length === 0
                    ? emptyTable
                    : (
                        <div className="table__body" data-test="Table__Content">
                            <table>
                                <thead className="table__table-header">
                                    <tr>
                                        {headers.map(header => (<th key={header.key + header.label}>{header.label ?? header.key}</th>))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageItems.map((item: any, index: number) => (
                                        <tr
                                            key={index}
                                            onClick={handleRowClick.bind(this, item)}
                                            data-test={`Table_Row_${index}`}
                                            className={readonly ? "disabled" : ""}>
                                            {parseRow(item, index)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </div>
            <div className="table__actions">
                {footer}
            </div>
        </Component>
    );
};

export default Table;