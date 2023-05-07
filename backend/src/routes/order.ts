import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { CreateOrderRequest, DeleteOrderRequest, GetOrderRequest, UpdateOrderRequest } from "./order.d";
import { createOrderBodySchema, updateOrderBodySchema } from "../schemas/oder";
import { CreateOrderParams, UpdateOrderParams } from "../models/order";
import ordersService from "../services/order-service";

declare module "fastify" {
    export interface FastifyInstance {}
}

const OrdersManagementRoutes: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.get(`/order`, async (request: FastifyRequest, reply: FastifyReply) => {
        return await ordersService.getOrders();
    });

    server.get(`/order/:id`, async (request: GetOrderRequest, reply: FastifyReply) => {
        return await ordersService.getOrder(request.params.id);
    });

    server.post(
        `/order`,
        {
            schema: {
                body: createOrderBodySchema,
            },
        },
        async (request: CreateOrderRequest, reply: FastifyReply) => {
            const order = await ordersService.createOrder(request.body as CreateOrderParams);
            reply.statusCode = 203;
            return { order };
        }
    );

    server.patch(
        `/order/:id`,
        {
            schema: {
                body: updateOrderBodySchema,
            },
        },
        async (request: UpdateOrderRequest, reply: FastifyReply) => {
            const orderToUpdate = { ...(request.body as UpdateOrderParams), id: request.params.id };
            await ordersService.updateOrder(orderToUpdate);
            reply.statusCode = 204;
        }
    );

    server.delete(`/order/:id`, async (request: DeleteOrderRequest, reply: FastifyReply) => {
        await ordersService.deleteOrder(request.params.id);
        reply.statusCode = 204;
    });
};
export default fp(OrdersManagementRoutes);
