import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { PageInfo } from "../../models/pagination";
import PageNavigator from "./PageNavigator";
import SearchBar from "./SearchBar";

const Component = styled.div`
    background-color: #f2f0fa;
    padding: 0.5rem 0;

    .table__pre-append {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }

    .table {
        width: 100%;
        background-color: #ffffff;
        border-radius: 0.25rem;

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
            width: 100%;
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
                        background-color: #777188;
                        color: #dfdede;
                    }
                }
            }
        }
    }
`;

export interface TableHeaderInfo {
    key: string;
    label?: string;
    parseFunction?: (value: any) => string;
}

export interface TableProps {
    title?: string;
    actions?: ReactNode;
    headers: TableHeaderInfo[];
    items: any[];
    searchKey: string;
    onRowClick: (item: any) => void;
}

const Table: FunctionComponent<TableProps> = ({ title, actions: filters, headers, items, searchKey, onRowClick }) => {
    const [ filteredItems, setFilteredItems ] = useState<any[]>([]);
    const [ pageItems, setPageItems ] = useState<any[]>([]);
    const [ pageInfo, setPageInfo ] = useState<PageInfo>({ pageNumber: 1, pageSize: 10 });
    const [ searchTerm, setSearchTerm ] = useState<string>("");

    useEffect(() => {
        const matchTerms = items.filter(item => item[searchKey].toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredItems(matchTerms);
        const from = (pageInfo.pageNumber - 1) * pageInfo.pageSize;
        const to = pageInfo.pageSize + ((pageInfo.pageNumber - 1) * pageInfo.pageSize);
        const pageItems = matchTerms.slice(from, to);
        setPageItems(pageItems);
    }, [ pageInfo, items, searchKey, searchTerm ]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handlePageChange = (page: PageInfo) => setPageInfo(page);

    const pageCount = Math.max(Math.ceil(filteredItems.length / pageInfo.pageSize), 1);

    const handleRowClick = (id: string) => onRowClick(id);

    const parseRow = (item: any, index: number) => (headers
        .map((header: TableHeaderInfo) => ({ key: `${index}-${header.key}`, item, value: header.parseFunction ? header.parseFunction(item[header.key]) : String(item[header.key]) }))
        .map(row => <td className="item-row" key={row.key}>{row.value}</td>));

    const emptyTable = (<div className="table__no-data">No results</div>);

    return (
        <Component>
            <div className="table__pre-append">
                <div>
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
                                        {headers.map(header => (<th key={header.key}>{header.label ?? header.key}</th>))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageItems.map((item: any, index: number) => (<tr key={index} onClick={handleRowClick.bind(this, item)} data-test={`Table_Row_${index}`}>{parseRow(item, index)}</tr>))}
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </div>
        </Component>
    );
};

export default Table;