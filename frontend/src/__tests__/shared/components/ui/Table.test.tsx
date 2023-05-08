import { fireEvent, render } from "@testing-library/react";
import Table, { TableProps } from "shared/components/ui/Table";

const makeSut = (props: TableProps) => {
    return render(<Table {...props} />);
};

test("Should render card body correctly", () => {
    const items = [ { name: "Apple", value: 30 } ];
    const headers = [ { key: "name" }, { key: "value" } ];
    const { getByTestId } = makeSut({ items, headers, searchKeys: ["name"], onRowClick: jest.fn });

    expect(getByTestId("Table__Container")).toBeInTheDocument();
    expect(getByTestId("Table__Content")).toBeInTheDocument();
});

test("Should call onRowClick when a row of the table is clicked", () => {
    const spy = jest.fn();
    const items = [ { name: "Apple", value: 30 } ];
    const headers = [ { key: "name" }, { key: "value" } ];
    const { getByTestId } = makeSut({ items, headers, searchKeys: ["name"], onRowClick: spy });

    fireEvent.click(getByTestId("Table_Row_0"));

    expect(spy).toHaveBeenCalledTimes(1);
});