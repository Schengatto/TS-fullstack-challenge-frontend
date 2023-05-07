import cors from "@fastify/cors";
import HealthCheckRoutes from "./routes/health";
import OrdersManagementRoutes from "./routes/order";
import OrdersPlanRoutes from "./routes/plan";
import DepotsRoutes from "./routes/depot";

const fastify = require("fastify")({ logger: true });

const start = async () => {
    try {
        // Routes
        fastify.register(HealthCheckRoutes)
        fastify.register(OrdersManagementRoutes);
        fastify.register(OrdersPlanRoutes);
        fastify.register(DepotsRoutes);

        await fastify.register(cors, {
            // CORS disabled for this challenge
            origin: true
        });
        await fastify.listen({ port: 3000, host: "0.0.0.0" });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
