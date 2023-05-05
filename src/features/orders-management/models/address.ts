export interface AddressInfo {
    owner: string;
    city: string;
    postalCode: string;
    address: string;
    coordinates: GeolocationCoordinate;
    phoneNumber?: string;
    notes?: string;
}

export interface GeolocationCoordinate {
    latitude: number;
    longitude: number;
}