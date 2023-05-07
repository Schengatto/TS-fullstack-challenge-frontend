import { Order, OrderStatus } from "../models/order";

export const MOCKED_DATA_ORDERS: Order[] = [
    {
        id: "0001",
        status: OrderStatus.OrderPlaced,
        createAt: new Date("2023-05-06"),
        packages: [
            {
                code: "P0001",
                destination: {
                    owner: "Topo",
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
    },
    {
        id: "0002",
        status: OrderStatus.Shipped,
        createAt: new Date("2023-05-07"),
        packages: [
            {
                code: "P0003",
                destination: {
                    owner: "Enrico",
                    address: "Via viola",
                    city: "Verona",
                    latitude: 60,
                    longitude: 30,
                    postalCode: "20223",
                },
                supplierId: "S0001",
                notes: "Hello world",
            },
        ],
        invoiceId: "A002",
        notes: "Consegnare Subito",
        planId: "P0001",
    },
];
