import { PlanInfo } from "../models/depot";
import { RequestBuilder } from "shared/utils/request-builder";
import httpService from "shared/services/http-service";

class PlanService {
    async createPlan(depotId: string, ordersId: string[]): Promise<PlanInfo> {
        const request = new RequestBuilder().withURL("plan").withPayload({ depotId, ordersId }).build();
        return await httpService.post<PlanInfo>(request).then((res) => res.data);
    }

    async getPlan(id: string): Promise<PlanInfo | undefined> {
        const request = new RequestBuilder().withURL(`plan/${id}`).build();
        return await httpService.get<PlanInfo>(request).then((res) => res.data);
    }
}

const instance = new PlanService();
export default instance;
