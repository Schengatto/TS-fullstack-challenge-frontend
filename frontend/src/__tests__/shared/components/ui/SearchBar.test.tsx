import { fireEvent, render, waitFor } from "@testing-library/react";
import SearchBar, { SearchBarProps } from "shared/components/ui/SearchBar";

const makeSut = (props: Partial<SearchBarProps>) => {
    return render(<SearchBar onSearch={jest.fn()} {...props} />);
};

test("Should call onSearch successfully", async () => {
    const spy = jest.fn();
    jest.useFakeTimers();

    const { getByTestId } = makeSut({ onSearch: spy });
    const input = getByTestId("SearchBar__Input");

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "test" } });
    jest.runAllTimers();

    await waitFor(() => expect(spy).toHaveBeenCalled());
});