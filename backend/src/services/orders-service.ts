import { MOCKED_DATA_ORDERS } from "../data/orders";
import { CreateOrderParams, Order, OrderStatus, UpdateOrderParams } from "../models/order";

class OrdersService {
    async getOrders(): Promise<Order[]> {
        return Promise.resolve(MOCKED_DATA_ORDERS);
    }

    async getOrder(id: string): Promise<Order | undefined> {
        return Promise.resolve(MOCKED_DATA_ORDERS.find((m) => m.id === id));
    }

    async createOrder(createOrderParams: CreateOrderParams): Promise<Order> {
        const order = {
            ...createOrderParams,
            id: `O${Date.now()}`,
            status: OrderStatus.OrderPlaced,
            createAt: new Date(),
        };
        MOCKED_DATA_ORDERS.push(order);
        return Promise.resolve(order);
    }

    async updateOrder(updateOrderParams: UpdateOrderParams): Promise<void> {
        const index = MOCKED_DATA_ORDERS.findIndex((m) => m.id === updateOrderParams.id);
        if (index >= 0) {
            MOCKED_DATA_ORDERS[index] = { ...MOCKED_DATA_ORDERS[index], ...updateOrderParams };
        }
        return Promise.resolve(null);
    }

    async deleteOrder(id: string): Promise<void> {
        const order = MOCKED_DATA_ORDERS.find((m) => m.id === id);
        if (order) {
            order.status = OrderStatus.Cancelled;
        }
        return Promise.resolve(null);
    }
}

export default new OrdersService();
