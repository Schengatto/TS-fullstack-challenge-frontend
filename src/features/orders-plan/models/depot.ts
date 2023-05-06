import { AddressInfo } from "../../../shared/models/address";

export interface Depot {
    id: string;
    name: string;
    address: AddressInfo;
}

export interface PlanInfo {
    id?: string;
    ordersId: string[];
    depotId: string;
}
