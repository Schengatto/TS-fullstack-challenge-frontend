import { fireEvent, render } from "@testing-library/react";
import PageNavigator, { PageNavigatorProps } from "shared/components/ui/PageNavigator";

const makeSut = (props: PageNavigatorProps) => {
    return render(<PageNavigator {...props} />);
};

test("Should render successfully", async () => {
    const spy = jest.fn();
    const { getByText } = makeSut({ pageCount: 1, onPageChange: spy, pageNumber: 1, pageSize: 10 });

    expect(getByText("of 1")).toBeInTheDocument();
});

test("Should call onPageChange on next button click if pageCount is greater than pageNumber", async () => {
    const spy = jest.fn();
    const { getByTestId } = makeSut({ pageCount: 2, onPageChange: spy, pageNumber: 1, pageSize: 10 });

    fireEvent.click(getByTestId("PageNavigator__Button__Next"));

    expect(spy).toHaveBeenCalledTimes(1);
});

test("Should not call onPageChange on next button click if pageCount is equal than pageNumber", async () => {
    const spy = jest.fn();
    const { getByTestId } = makeSut({ pageCount: 1, onPageChange: spy, pageNumber: 1, pageSize: 10 });

    fireEvent.click(getByTestId("PageNavigator__Button__Next"));

    expect(spy).not.toHaveBeenCalled();
});

test("Should call onPageChange on prev button click if current page is greater than 1", async () => {
    const spy = jest.fn();
    const { getByTestId } = makeSut({ pageCount: 2, onPageChange: spy, pageNumber: 2, pageSize: 10 });

    fireEvent.click(getByTestId("PageNavigator__Button__Prev"));

    expect(spy).toHaveBeenCalledTimes(1);
});

test("Should not call onPageChange on prev button click if current page is equal to 1", async () => {
    const spy = jest.fn();
    const { getByTestId } = makeSut({ pageCount: 2, onPageChange: spy, pageNumber: 1, pageSize: 10 });

    fireEvent.click(getByTestId("PageNavigator__Button__Prev"));

    expect(spy).not.toHaveBeenCalled();
});

test("Should call onPageChange when the user change the pageSize selector", async () => {
    const spy = jest.fn();
    const { getByTestId } = makeSut({ pageCount: 2, onPageChange: spy, pageNumber: 1, pageSize: 10 });

    fireEvent.change(getByTestId("PageNavigator__Select__PageSize"), { target: { value: "5" } });

    expect(spy).toHaveBeenCalledTimes(1);
});