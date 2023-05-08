import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import OrderForm, { OrderFormProps } from "features/orders-management/components/form/OrderForm";
import { act } from "react-dom/test-utils";

jest.mock("shared/services/http-service", () => ({
    get: jest.fn(() => new Promise((res) => res({ data: [] })))
}));

jest.mock("features/orders-management/components/form/PackageForm");
jest.mock("shared/components/ui/Table");

const makeSut = async (props: OrderFormProps) => {
    await act(async () => render(<OrderForm {...props} />));
};

test("Rendered correctly", async () => {

    const onCancel = jest.fn();
    const onSubmit = jest.fn();

    await makeSut({ readonly: false, onCancel, onSubmit });

    expect(screen.getByTestId("InputText__Date")).toBeInTheDocument();
    expect(screen.getByTestId("InputText__Status")).toBeInTheDocument();
    expect(screen.getByTestId("InputText__InvoiceNumber")).toBeInTheDocument();
    expect(screen.getByTestId("TextArea__OrderNotes")).toBeInTheDocument();
});
