import { render, screen } from "@testing-library/react";
import { getOrders } from "features/orders-management/services/orders-service";
import PlanCreate from "pages/plan/PlanCreate";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
// import { getOrders } from "features/orders-management/services/orders-service";

jest.mock("shared/services/http-service", () => ({
  get: jest.fn(() => new Promise((res) => res({ data: [] })))
}));

jest.mock("features/orders-management/services/orders-service", () => ({
  getOrders: jest.fn().mockResolvedValue([])
}));

jest.mock("features/orders-plan/services/plan-service", () => ({
  createPlan: jest.fn(() => Promise.resolve(null))
}));

jest.mock("features/orders-plan/components/form/PlanForm");
jest.mock("shared/components/ui/Table");

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useRoutePlanCreate: () => jest.fn()
}));

beforeEach(() => {
  (getOrders as any).mockResolvedValue([]);
});

test("renders the component", async () => {
  await act(async () => render(<BrowserRouter><PlanCreate /></BrowserRouter>));
  const title = screen.getByTestId("PlanCreate__Title__container");
  expect(title).toBeInTheDocument();
});