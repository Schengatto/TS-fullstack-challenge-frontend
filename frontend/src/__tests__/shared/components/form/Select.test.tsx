import { fireEvent, render, waitFor } from "@testing-library/react";
import Select, { SelectProps } from "shared/components/form/Select";

const makeSut = (props: SelectProps) => {
    return render(<Select {...props} />);
};

test("Should call onChange when the user input text", async () => {
    const spy = jest.fn();

    const items = Array.from(Array(4).keys()).map(i => ({ label: `item_${i}`, value: `value_${i}` }));

    const { getByTestId } = makeSut({ items, onChange: spy, dataTest: "Select__Container"  });
    const select = getByTestId("Select__Container");

    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: "test" } });

    await waitFor(() => expect(spy).toHaveBeenCalled());
});