export interface AddressInfo extends GeolocationCoordinate {
    owner: string;
    city: string;
    postalCode: string;
    address: string;
    phoneNumber?: string;
    notes?: string;
}

export interface GeolocationCoordinate {
    latitude: number;
    longitude: number;
}