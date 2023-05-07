import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
    export interface FastifyInstance {}
}

const HealthCheckRoutes: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.get(`/health`, async (request: FastifyRequest, reply: FastifyReply) => {
        reply.status(200).send("OK");
    });
};
export default fp(HealthCheckRoutes);
