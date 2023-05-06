import OrdersManagementRoutes from "./routes/order";

const fastify = require("fastify")({ logger: true });

const start = async () => {
    try {
        // Routes
        fastify.register(OrdersManagementRoutes);
        await fastify.listen({ port: 3000, host: "0.0.0.0" });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
