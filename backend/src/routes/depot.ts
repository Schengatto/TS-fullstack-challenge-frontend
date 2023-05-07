import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest} from "fastify";
import fp from "fastify-plugin";
import depotService from "../services/depot-service";

declare module "fastify" {
    export interface FastifyInstance {}
}

const DepotsRoutes: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.get(`/depot`, async (request: FastifyRequest, reply: FastifyReply) => {
        return await depotService.getDepots();
    });
};
export default fp(DepotsRoutes);
