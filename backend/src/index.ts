import cors from "@fastify/cors";
import OrdersManagementRoutes from "./routes/order";

const fastify = require("fastify")({ logger: true });

const start = async () => {
    try {
        // Routes
        fastify.register(OrdersManagementRoutes);
        await fastify.register(cors, {
            // put your options here
            origin: (origin, cb) => {
                const hostname = new URL(origin).hostname;
                if (hostname === "localhost") {
                    //  Request from localhost will pass
                    cb(null, true);
                    return;
                }
                // Generate an error on other origins, disabling access
                cb(new Error("Not allowed"), false);
            },
        });
        await fastify.listen({ port: 3000, host: "0.0.0.0" });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
