import { PlanInfo } from "../models/depot";

class PlanService {
    async createPlan(planInfo: PlanInfo): Promise<boolean> {
        await this.delay(2500);
        console.log(planInfo);
        return Promise.resolve(true);
    }

    private async delay(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}

const instance = new PlanService();
export default instance;
