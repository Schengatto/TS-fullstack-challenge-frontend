import { render, screen } from "@testing-library/react";
import Home from "pages/Home";

jest.mock("shared/services/http-service", () => ({
  get: jest.fn(() => new Promise((res, rej) => res({ data: [] })))
}));

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("renders the component", () => {
  render(<Home />);
  const serverStatusContainer = screen.getByTestId("Home__ServerStatus__container");
  const startButton = screen.getByTestId("Home__Button__start");
  expect(serverStatusContainer).toBeInTheDocument();
  expect(startButton).toBeInTheDocument();
});