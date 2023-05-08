import { render, screen } from "@testing-library/react";
import PackageForm, { PackageFormProps } from "features/orders-management/components/form/PackageForm";
import { act } from "react-dom/test-utils";

jest.mock("shared/services/http-service", () => ({
    get: jest.fn(() => new Promise((res) => res({ data: [] })))
}));

const makeSut = async (props: PackageFormProps) => {
    await act(async () => render(<PackageForm {...props} />));
};

test("Rendered correctly", async () => {

    const onCancel = jest.fn();
    const onSubmit = jest.fn();

    await makeSut({ packageInfo: null, readonly: false, onCancel, onSubmit });

    expect(screen.getByTestId("InputText__Code")).toBeInTheDocument();
    expect(screen.getByTestId("InputText__Supplier")).toBeInTheDocument();
    expect(screen.getByTestId("InputText__RecipientName")).toBeInTheDocument();
    expect(screen.getByTestId("InputText__City")).toBeInTheDocument();

    expect(screen.getByTestId("InputText__PostalCode")).toBeInTheDocument();
    expect(screen.getByTestId("InputText__Road")).toBeInTheDocument();
    expect(screen.getByTestId("InputText__Latitude")).toBeInTheDocument();
    expect(screen.getByTestId("InputText__Longitude")).toBeInTheDocument();
    expect(screen.getByTestId("InputText__PhoneNumber")).toBeInTheDocument();
    expect(screen.getByTestId("TextArea__Notes")).toBeInTheDocument();
});
