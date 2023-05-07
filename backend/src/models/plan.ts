import { AddressInfo } from "./address";

export interface PlanInfo {
    id?: string;
    steps: PlanStep[];
}

export interface PlanStep {
    location: AddressInfo;
    orderId?: string;
    packageCode?: string;
}

export interface CreatePlanParams {
    depotId: string;
    ordersId: string[];
}