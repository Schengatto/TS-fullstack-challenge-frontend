import { render, screen, waitFor } from "@testing-library/react";
import ordersService from "features/orders-management/services/orders-service";
import { OrderStatus } from "features/orders-management/models/order";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import OrderDetail from "pages/orders-management/OrderDetail";

jest.mock("shared/services/http-service", () => ({
  get: jest.fn(() => new Promise((res) => res({ data: [] })))
}));

jest.mock("features/orders-management/services/orders-service", () => ({
  getOrder: jest.fn().mockResolvedValue(null)
}));

jest.mock("features/orders-management/components/form/OrderForm");

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useRouteOrderDetails: () => jest.fn(),
}));

const fakeOrder = {
  id: "0001",
  status: OrderStatus.OrderPlaced,
  createAt: new Date("2023-05-06"),
  packages: [
    {
      code: "P0001",
      destination: {
        owner: "Gigi",
        address: "Via scura",
        city: "Milano",
        latitude: 10,
        longitude: 20,
        postalCode: "20222",
      },
      supplierId: "S0002",
    },
    {
      code: "P0002",
      destination: {
        owner: "Matteo Salerno",
        address: "Via verde",
        city: "Venezia",
        latitude: 60,
        longitude: 30,
        postalCode: "20223",
      },
      supplierId: "S0001",
      notes: "Fragile",
    },
  ],
  invoiceId: "A001",
  notes: "Consegnare entro fine mese",
};

beforeEach(() => {
  (ordersService.getOrder as any).mockResolvedValue([]);
});

afterEach(() => {
  (ordersService.getOrder as any).mockClear();
});

test("renders the component", async () => {
  const routes = [{
    path: "/order/:id",
    element: <OrderDetail />,
    loader: () => fakeOrder,
  }];

  const router = createMemoryRouter(routes, { initialEntries: ["/order/0001"] });
  render(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(screen.getByTestId("OrderDetail__Title__container")).toBeInTheDocument();
  });
});