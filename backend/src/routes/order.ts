import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
// import { GetRequest, CreateRequest } from "./order.d";
import ordersService from "../services/orders-service";
import { FromSchema } from "json-schema-to-ts";
import { CreateOrder } from "../models/order";

// Declaration merging
declare module "fastify" {
    export interface FastifyInstance {}
}

const createOrderBodySchema = {
    type: "object",
    properties: {
        packages: { type: "array", minItems: 1 },
        invoiceId: { type: "string" },
        createAt: { type: "string" },
        notes: { type: "string" },
        planId: { type: "string" },
    },
    required: ["packages", "invoiceId"],
} as const;

export type GetOrderRequest = FastifyRequest<{
    Params: { id: string };
}>;

export type CreateOrderRequest = FastifyRequest<{
    Body: FromSchema<typeof createOrderBodySchema>;
}>;

const OrdersManagementRoutes: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.get(`/order`, async (request: FastifyRequest, reply: FastifyReply) => {
        return await ordersService.getOrders();
    });

    server.get(`/order/:id`, async (request: GetOrderRequest, reply: FastifyReply) => {
        return await ordersService.getOrder(request.params.id);
    });

    server.post<{ Body: FromSchema<typeof createOrderBodySchema> }>(
        `/order`,
        {
            schema: {
                body: createOrderBodySchema,
                response: {
                    201: {
                        type: "string",
                    },
                },
            },
        },
        async (request: CreateOrderRequest, reply: FastifyReply) => {
            return await ordersService.createOrder(request.body as CreateOrder);
        }
    );
};
export default fp(OrdersManagementRoutes);
