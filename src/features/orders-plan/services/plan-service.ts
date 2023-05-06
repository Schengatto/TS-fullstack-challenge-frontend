import { PlanInfo } from "../models/depot";

const plans: PlanInfo[] = [
    { id: "P0001", depotId: "D0001", ordersId: ["O0001", "O0002"] },
    { id: "P0002", depotId: "D0002", ordersId: ["O0003", "O0004"] }
];

class PlanService {
    async createPlan(planInfo: PlanInfo): Promise<boolean> {
        await this.delay(2500);
        console.log(planInfo);
        return Promise.resolve(true);
    }

    async getPlan(id: string): Promise<PlanInfo | undefined> {
        await this.delay(500);
        return Promise.resolve(plans.find((m) => m.id === id));
    }

    private async delay(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}

const instance = new PlanService();
export default instance;
