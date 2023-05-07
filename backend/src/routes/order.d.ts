import { FastifyRequest } from "fastify";
import { FromSchema } from "json-schema-to-ts";
import { createOrderBodySchema, updateOrderBodySchema } from "../schemas/oder";

export type GetOrderRequest = FastifyRequest<{
    Params: { id: string };
}>;

export type DeleteOrderRequest = FastifyRequest<{
    Params: { id: string };
}>;

export type CreateOrderRequest = FastifyRequest<{
    Body: FromSchema<typeof createOrderBodySchema>;
}>;

export type UpdateOrderRequest = FastifyRequest<{
    Params: { id: string };
    Body: FromSchema<typeof updateOrderBodySchema>;
}>;