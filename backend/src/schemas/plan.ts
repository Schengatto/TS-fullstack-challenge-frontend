export const createPlanBodySchema = {
    type: "object",
    properties: {
        depotId: { type: "string" },
        ordersId: { type: "array", minItems: 1 },
    },
    required: ["ordersId", "depotId"],
} as const;
