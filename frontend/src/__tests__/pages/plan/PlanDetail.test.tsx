import { render, screen } from "@testing-library/react";
import PlanDetail from "pages/plan/PlanDetail";
import { act } from "react-dom/test-utils";
import { BrowserRouter} from "react-router-dom";

jest.mock("shared/services/http-service", () => ({
  get: jest.fn(() => new Promise((res) => res({ data: [] })))
}));

jest.mock("features/orders-plan/services/plan-service", () => ({
  createPlan: jest.fn(() => Promise.resolve(null))
}));

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useRoutePlanDetail: () => jest.fn(),
  useLoaderData: () => jest.fn(() => ({ id: "PTEST", steps: [] }))
}));

jest.mock("features/orders-plan/components/TrackingSteps");

test("renders the component", async () => {
  await act(async () => render(<BrowserRouter><PlanDetail /></BrowserRouter>));
  const title = screen.getByTestId("PlanDetail__Title__container");
  expect(title).toBeInTheDocument();
});