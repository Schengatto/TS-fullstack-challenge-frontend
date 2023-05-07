import { MOCKED_DATA_DEPOTS } from "../data/depots";
import { Depot } from "../models/depot";

class DepotService {
    async getDepots(): Promise<Depot[]> {
        return Promise.resolve(MOCKED_DATA_DEPOTS);
    }
}

const instance = new DepotService();
export default instance;
