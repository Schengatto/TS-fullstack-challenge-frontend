import { Order, OrderStatus } from "../models/order";
import { MOCKED_DATA_ORDERS } from "../data/orders";
import { RequestBuilder } from "shared/utils/request-builder";
import httpService from "shared/service/http-service";

class OrdersService {
    async getOrders(): Promise<Order[]> {
        const request = new RequestBuilder().withURL("order").build();
        // try {
            return await httpService.get<Order[]>(request).then((res) => res.data);
        // } catch (error: any) {
        //     if (error.name === "CanceledError") return Promise.resolve([]);
        //     throw new Error(error.message);
        // }
    }

    async getOrder(id: string): Promise<Order | undefined> {
        await this.delay(500);
        return Promise.resolve(MOCKED_DATA_ORDERS.find((m) => m.id === id));
    }

    async addOrder(order: Order): Promise<boolean> {
        await this.delay(2500);
        MOCKED_DATA_ORDERS.push(order);
        return Promise.resolve(true);
    }

    async updateOrder(order: Order): Promise<boolean> {
        await this.delay(500);
        const index = MOCKED_DATA_ORDERS.findIndex((m) => m.id === order.id);
        if (index >= 0) {
            MOCKED_DATA_ORDERS[index] = order;
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    async deleteOrder(id: string): Promise<boolean> {
        await this.delay(500);
        const order = MOCKED_DATA_ORDERS.find((m) => m.id === id);
        if (order) {
            order.status = OrderStatus.Cancelled;
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    private async delay(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}

const instance = new OrdersService();
export default instance;
