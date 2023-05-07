import { Depot } from "../models/depot";
import { RequestBuilder } from "shared/utils/request-builder";
import httpService from "shared/services/http-service";

class DepotService {
    async getDepots(): Promise<Depot[]> {
        const request = new RequestBuilder().withURL("depot").build();
        return await httpService.get<Depot[]>(request).then((res) => res.data);
    }
}

const instance = new DepotService();
export default instance;
