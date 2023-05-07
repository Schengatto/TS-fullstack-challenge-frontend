export const createOrderBodySchema = {
    type: "object",
    properties: {
        packages: { type: "array", minItems: 1 },
        invoiceId: { type: "string" },
        notes: { type: "string" },
    },
    required: ["packages", "invoiceId"],
} as const;


export const updateOrderBodySchema = {
    type: "object",
    properties: {
        packages: { type: "array", minItems: 1 },
        invoiceId: { type: "string" },
        notes: { type: "string" },
    },
    required: ["packages", "invoiceId"],
} as const;