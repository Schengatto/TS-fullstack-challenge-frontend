import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import ordersService from "../services/orders-service";

// Declaration merging
declare module "fastify" {
    export interface FastifyInstance {}
}

// type MarketHistoricalPricesRequest = FastifyRequest<{
//     Querystring: { resolution: Resolution; max: number; from: string; to: string };
//     Params: { epic: string };
// }>;

const OrdersManagementRoutes: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.get(`/order`, async (request: FastifyRequest, reply: FastifyReply) => {
        return await ordersService.getOrders();
    });
};
export default fp(OrdersManagementRoutes);
