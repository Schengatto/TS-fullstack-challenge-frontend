import { AddressInfo } from "../../../shared/models/address";

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
    stepNumber: number;
    location: AddressInfo;
    orderId?: string;
    packageCode?: string;
}