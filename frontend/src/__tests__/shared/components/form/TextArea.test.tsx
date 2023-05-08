import { fireEvent, render, waitFor } from "@testing-library/react";
import TextArea, { TextAreaProps } from "shared/components/form/TextArea";

const makeSut = (props: TextAreaProps) => {
    return render(<TextArea {...props} />);
};

test("Should call onChange when the user input text", async () => {
    const spy = jest.fn();

    const { getByTestId } = makeSut({ label: "test", onChange: spy });
    const input = getByTestId("TextArea_Input");

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => expect(spy).toHaveBeenCalled());
});