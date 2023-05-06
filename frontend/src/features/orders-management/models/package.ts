import { AddressInfo } from "../../../shared/models/address";

export interface Package {
    code: string;
    supplierId: string;
    destination: AddressInfo;
    notes?: string;
}
