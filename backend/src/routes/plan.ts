import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply} from "fastify";
import fp from "fastify-plugin";
import planService from "../services/plan-service";
import {CreatePlanRequest, GetPlanRequest} from "./plan.d";
import { createPlanBodySchema } from "../schemas/plan";
import { CreatePlanParams } from "../models/plan";

declare module "fastify" {
    export interface FastifyInstance {}
}

const OrdersPlanRoutes: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.get(`/plan/:id`, async (request: GetPlanRequest, reply: FastifyReply) => {
        return await planService.getPlan(request.params.id);
    });

    server.post(
        `/plan`,
        {
            schema: {
                body: createPlanBodySchema,
            },
        },
        async (request: CreatePlanRequest, reply: FastifyReply) => {
            const order = await planService.createPlan(request.body as CreatePlanParams);
            reply.statusCode = 201;
            return { order };
        }
    );
};
export default fp(OrdersPlanRoutes);
