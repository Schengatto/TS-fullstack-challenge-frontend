import { render, screen, waitFor } from "@testing-library/react";
import ordersService from "features/orders-management/services/orders-service";
import OrdersList from "pages/orders-management/OrdersList";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

jest.mock("shared/services/http-service", () => ({
  get: jest.fn(() => new Promise((res) => res({ data: [] })))
}));

jest.mock("features/orders-management/services/orders-service", () => ({
  getOrders: jest.fn().mockResolvedValue(null)
}));

jest.mock("features/orders-management/components/form/OrderForm");

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useRouteOrdersLists: () => jest.fn(),
}));

beforeEach(() => {
  (ordersService.getOrders as any).mockResolvedValue([]);
});

afterEach(() => {
  (ordersService.getOrders as any).mockClear();
});

test("renders the component", async () => {

  await act(async () => render(<BrowserRouter><OrdersList /></BrowserRouter>));

  await waitFor(() => {
    expect(screen.getByTestId("OrdersList__Title__container")).toBeInTheDocument();
  });
});