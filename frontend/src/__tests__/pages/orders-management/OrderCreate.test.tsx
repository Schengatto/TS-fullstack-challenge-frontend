import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import ordersService from "features/orders-management/services/orders-service";
import OrderCreate from "pages/orders-management/OrderCreate";

jest.mock("shared/services/http-service", () => ({
  get: jest.fn(() => new Promise((res) => res({ data: [] })))
}));

jest.mock("features/orders-management/services/orders-service", () => ({
  createOrder: jest.fn().mockResolvedValue(null)
}));

jest.mock("features/orders-management/components/form/OrderForm");

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useRouteOrderCreate: () => jest.fn()
}));

beforeEach(() => {
  (ordersService.createOrder as any).mockResolvedValue([]);
});

afterEach(() => {
  (ordersService.createOrder as any).mockClear();
});

test("renders the component", async () => {
  await act(async () => render(<BrowserRouter><OrderCreate /></BrowserRouter>));
  const title = screen.getByTestId("OrderCreate__Title__container");
  expect(title).toBeInTheDocument();
});