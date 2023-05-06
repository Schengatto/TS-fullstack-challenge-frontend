import { AddressInfo } from "../../../shared/models/address";

export interface Depot {
    id: string;
    name: string;
    address: AddressInfo;
}

export interface PlanInfo {
    ordersId: string[];
    depotId: string;
}
