import { render, screen } from "@testing-library/react";
import Error from "pages/Error";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useRouteError: () => jest.fn()
}));

test("renders the component", async () => {
  await act(async () => render(<BrowserRouter><Error /></BrowserRouter>));
  const linkToHome = screen.getByTestId("Error__Link__home");
  expect(linkToHome).toBeInTheDocument();
});