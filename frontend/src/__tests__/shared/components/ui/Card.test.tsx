import { render } from "@testing-library/react";
import Card, { CardProps } from "shared/components/ui/Card";

const makeSut = (props?: Partial<CardProps>) => {
    const children = <div>Test</div>;
    return render(<Card children={children} {...props} />);
};

test("Should render card body correctly", () => {
    const { getByText } = makeSut();

    expect(getByText(/Test/)).toBeInTheDocument();
});

test("Should render card header correctly", () => {
    const header = <div>Header</div>;
    const { getByText } = makeSut({ header });

    expect(getByText(/Header/)).toBeInTheDocument();
});

test("Should render card footer correctly", () => {
    const footer = <div>Footer</div>;
    const { getByText } = makeSut({ footer });

    expect(getByText(/Footer/)).toBeInTheDocument();
});