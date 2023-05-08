import { fireEvent, render, waitFor } from "@testing-library/react";
import InputText, { InputTextProps } from "shared/components/form/InputText";

const makeSut = (props: InputTextProps) => {
    return render(<InputText {...props} />);
};

test("Should call onChange when the user input text", async () => {
    const spy = jest.fn();

    const { getByTestId } = makeSut({ label: "test", onChange: spy });
    const input = getByTestId("InputText_Input");

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => expect(spy).toHaveBeenCalled());
});