import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("shared/services/http-service", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] }))
}));

jest.mock("pages/Home", () => {
  return function DummyHome() {
    return (<div>Home</div>);
  }
});

describe("Test App component", () => {

  test("renders the components", () => {
    render(<App />);
    const headerElement = screen.getByTestId("Header__Container");
    const footerElement = screen.getByTestId("Footer__Container");
    expect(headerElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
  });
});