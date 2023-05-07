import { FastifyRequest } from "fastify";
import { FromSchema } from "json-schema-to-ts";
import { createPlanBodySchema } from "../schemas/plan";

export type GetPlanRequest = FastifyRequest<{
    Params: { id: string };
}>;

export type CreatePlanRequest = FastifyRequest<{
    Body: FromSchema<typeof createPlanBodySchema>;
}>;
