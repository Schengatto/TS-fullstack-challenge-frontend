import ordersServices from "features/orders-management/services/orders-service";
import { MOCKED_DATA_PLANS } from "../data/plans";
import { PlanInfo, PlanStep } from "../models/depot";
import { Order, OrderStatus } from "features/orders-management/models/order";
import { generateRandomString } from "shared/utils/string-utils";
import { Package } from "features/orders-management/models/package";
import { MOCKED_DATA_DEPOTS } from "../data/depots";

class PlanService {
    async createPlan(depotId: string, ordersId: string[]): Promise<boolean> {
        await this.delay(500);

        const planId = generateRandomString(6);
        const orders = new Array<Order>();

        for (let id of ordersId) {
            const order = await ordersServices.getOrder(id);
            if (order) {
                orders.push(order);
                await ordersServices.updateOrder({ ...order, status: OrderStatus.PreparingForShipment, planId });
            }
        }

        const steps = new Array<PlanStep>();
        orders.forEach((order) => {
            order.packages.forEach((packageInfo: Package) => {
                steps.push({
                    orderId: order.id!,
                    packageCode: packageInfo.code,
                    location: packageInfo.destination,
                });
            });
        });

        const depot = MOCKED_DATA_DEPOTS.find((depot) => depot.id === depotId);
        steps.unshift({ location: depot!.addressInfo });
        steps.push({ location: depot!.addressInfo });

        const newPlan: PlanInfo = { id: planId, steps };
        MOCKED_DATA_PLANS.push(newPlan);

        return Promise.resolve(true);
    }

    async getPlan(id: string): Promise<PlanInfo | undefined> {
        await this.delay(500);
        return Promise.resolve(MOCKED_DATA_PLANS.find((m) => m.id === id));
    }

    private async delay(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}

const instance = new PlanService();
export default instance;
