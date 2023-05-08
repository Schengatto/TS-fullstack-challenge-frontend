import { fireEvent, screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import PlanForm, { PlanFormProps } from "features/orders-plan/components/form/PlanForm";
import depotService from "features/orders-plan/services/depot-service";
import { act } from "react-dom/test-utils";

jest.mock("shared/services/http-service", () => ({
    get: jest.fn(() => new Promise((res) => res({ data: [] })))
}));

jest.mock("features/orders-plan/services/depot-service", () => ({
    getDepots: jest.fn().mockResolvedValue(null)
}));


const makeSut = async (props: PlanFormProps) => {
    await act(async () => render(<PlanForm {...props} />));
};

beforeEach(() => {
    (depotService.getDepots as any).mockResolvedValue([{ id: "1", name: "Test Depot", addressInfo: undefined }]);
});

afterEach(() => {
    (depotService.getDepots as any).mockClear();
});

test("Rendered correctly", async () => {

    const onCancel = jest.fn();
    const onSubmit = jest.fn();

    await makeSut({ disabled: false, onCancel, onSubmit });

    expect(screen.getByTestId("PlanForm__Button__cancel")).toBeInTheDocument();
    expect(screen.getByTestId("PlanForm__Button__start")).toBeInTheDocument();
});

test("Cancel button works", async () => {

    const onCancel = jest.fn();
    const onSubmit = jest.fn();

    await makeSut({ disabled: false, onCancel, onSubmit });
    const button = screen.getByTestId("PlanForm__Button__cancel");

    fireEvent.click(button);
    expect(onCancel).toHaveBeenCalled();
});

test("Submit button works", async () => {

    const onCancel = jest.fn();
    const onSubmit = jest.fn();

    await makeSut({ disabled: false, onCancel, onSubmit });
    const selector = screen.getByTestId("PlanForm__Select__depot");

    fireEvent.change(selector, { target: { value: "1" } });

    const button = screen.getByTestId("PlanForm__Button__start");

    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalled();
});
