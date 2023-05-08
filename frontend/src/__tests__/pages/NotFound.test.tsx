import { render, screen } from "@testing-library/react";
import NotFound from "pages/NotFound";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("renders the component", async () => {
  await act(async () => render(<BrowserRouter><NotFound /></BrowserRouter>));
  const linkToHome = screen.getByTestId("NotFound__Link__home");
  expect(linkToHome).toBeInTheDocument();
});