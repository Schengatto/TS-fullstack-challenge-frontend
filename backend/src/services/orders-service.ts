import { MOCKED_DATA_ORDERS } from "../data/orders";
import { Order, OrderStatus } from "../models/order";

class OrdersService {
    async getOrders(): Promise<Order[]> {
        return Promise.resolve(MOCKED_DATA_ORDERS);
    }

    async getOrder(id: string): Promise<Order | undefined> {
        return Promise.resolve(MOCKED_DATA_ORDERS.find((m) => m.id === id));
    }

    async createOrder(order: Order): Promise<boolean> {
        MOCKED_DATA_ORDERS.push({ ...order, id: `O${Date.now}`, status: OrderStatus.OrderPlaced });
        return Promise.resolve(true);
    }

    async updateOrder(order: Order): Promise<boolean> {
        const index = MOCKED_DATA_ORDERS.findIndex((m) => m.id === order.id);
        if (index >= 0) {
            MOCKED_DATA_ORDERS[index] = order;
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    async deleteOrder(id: string): Promise<boolean> {
        const order = MOCKED_DATA_ORDERS.find((m) => m.id === id);
        if (order) {
            order.status = OrderStatus.Cancelled;
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
}

export default new OrdersService();
