import { Order, OrderStatus } from "../models/order";

const CHALLENGE_API_KEY = "challengeApiKey";

const orders: Order[] = [
    { id: "0001", status: OrderStatus.OrderPlaced, packages: [], invoiceId: "A001" }
];

class OrdersService {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async getOrders(): Promise<Order[]> {
        await this.delay(1000);
        if (this.apiKey !== CHALLENGE_API_KEY) {
            return Promise.reject("API Key is not valid!");
        }
        return Promise.resolve(orders);
    }

    async getOrder(id: string): Promise<Order | undefined> {
        await this.delay(1000);
        if (this.apiKey !== CHALLENGE_API_KEY) {
            return Promise.reject("API Key is not valid!");
        }
        return Promise.resolve(orders.find((m) => m.id === id));
    }

    async addOrder(order: Order): Promise<boolean> {
        await this.delay(1000);
        if (this.apiKey !== CHALLENGE_API_KEY) {
            return Promise.reject("API Key is not valid!");
        }
        orders.push(order);
        return Promise.resolve(true);
    }

    async updateOrder(order: Order): Promise<boolean> {
        await this.delay(1000);
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
        await this.delay(1000);
        if (this.apiKey !== CHALLENGE_API_KEY) {
            return Promise.reject("API Key is not valid!");
        }
        const index = orders.findIndex((m) => m.id === id);
        if (index >= 0) {
            orders.splice(index, 1);
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
