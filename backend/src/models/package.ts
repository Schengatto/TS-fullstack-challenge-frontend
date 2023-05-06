import { AddressInfo } from "./address";

export interface Package {
    code: string;
    supplierId: string;
    destination: AddressInfo;
    notes?: string;
}
