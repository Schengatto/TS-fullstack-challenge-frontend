import { AddressInfo } from "./address";

export interface Depot {
    id: string;
    name: string;
    addressInfo: AddressInfo;
}

export interface PlanInfo {
    id?: string;
    steps: PlanStep[];
}

export interface PlanStep {
    location: AddressInfo;
    orderId?: string;
    packageCode?: string;
}
