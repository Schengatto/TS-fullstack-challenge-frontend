import { Order } from "../models/order";
import { RequestBuilder } from "shared/utils/request-builder";
import httpService from "shared/services/http-service";
import { CreateOrderRequestPayload, UpdateOrderRequestPayload } from "./orders-services.d";

class OrdersService {
    async getOrders(): Promise<Order[]> {
        const request = new RequestBuilder().withURL("order").build();
        return await httpService.get<Order[]>(request).then((res) => res.data);
    }

    async getOrder(id: string): Promise<Order | undefined> {
        const request = new RequestBuilder().withURL(`order/${id}`).build();
        return await httpService.get<Order>(request).then((res) => res.data);
    }

    async createOrder(order: Order): Promise<Order> {
        const payload: CreateOrderRequestPayload = {
            invoiceId: order.invoiceId,
            packages: order.packages,
            notes: order.notes
        };
        const request = new RequestBuilder().withURL("order").withPayload(payload).build();
        return await httpService.post<Order>(request).then((res) => res.data);
    }

    async updateOrder(order: Order): Promise<void> {
        const payload: UpdateOrderRequestPayload = {
            invoiceId: order.invoiceId,
            packages: order.packages,
            notes: order.notes,
            status: order.status
        };
        const request = new RequestBuilder().withURL(`order/${order.id}`).withPayload(payload).build();
        await httpService.patch<Order>(request);
    }

    async deleteOrder(id: string): Promise<void> {
        const request = new RequestBuilder().withURL(`order/${id}`).build();
        await httpService.delete<Order>(request);
    }
}

const instance = new OrdersService();
export default instance;
