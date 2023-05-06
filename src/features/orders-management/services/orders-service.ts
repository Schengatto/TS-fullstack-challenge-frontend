import { Order, OrderStatus } from "../models/order";

const CHALLENGE_API_KEY = "challengeApiKey";

const orders: Order[] = [
    {
        id: "0001",
        status: OrderStatus.OrderPlaced,
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
        planId: "P0001"
    },
];

class OrdersService {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async getOrders(): Promise<Order[]> {
        await this.delay(500);
        if (this.apiKey !== CHALLENGE_API_KEY) {
            return Promise.reject("API Key is not valid!");
        }
        return Promise.resolve(orders);
    }

    async getOrder(id: string): Promise<Order | undefined> {
        await this.delay(500);
        if (this.apiKey !== CHALLENGE_API_KEY) {
            return Promise.reject("API Key is not valid!");
        }
        return Promise.resolve(orders.find((m) => m.id === id));
    }

    async addOrder(order: Order): Promise<boolean> {
        await this.delay(2500);
        if (this.apiKey !== CHALLENGE_API_KEY) {
            return Promise.reject("API Key is not valid!");
        }
        orders.push(order);
        return Promise.resolve(true);
    }

    async updateOrder(order: Order): Promise<boolean> {
        await this.delay(500);
        if (this.apiKey !== CHALLENGE_API_KEY) {
            return Promise.reject("API Key is not valid!");
        }
        const index = orders.findIndex((m) => m.id === order.id);
        if (index >= 0) {
            orders[index] = order;
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    async deleteOrder(id: string): Promise<boolean> {
        await this.delay(500);
        const order = orders.find((m) => m.id === id);
        if (order) {
            order.status = OrderStatus.Cancelled;
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    async delay(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}

const instance = new OrdersService("challengeApiKey");
export default instance;
