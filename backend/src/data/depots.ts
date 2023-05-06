import { Depot } from "../models/depot";

export const MOCKED_DATA_DEPOTS: Depot[] = [
    { id: "D0004", name: "Roma", addressInfo: { address: "Via Romolo", city: "Roma", latitude: 41.88, longitude: 12.46, owner: "Nerone s.r.l.", postalCode: "00186" } },
    { id: "D0003", name: "Torino", addressInfo: { address: "Via Cavour", city: "Torino", latitude: 45.07, longitude: 7.63, owner: "Belmonte s.r.l.", postalCode: "10121" } },
    { id: "D0001", name: "Verona", addressInfo: { address: "Via Germania", city: "Verona", latitude: 45.41, longitude: 10.97, owner: "Milkman test S.p.A.", postalCode: "37136" } },
    { id: "D0002", name: "Verona 2", addressInfo: { address: "Via dei test", city: "Verona", latitude: 45.43, longitude: 11.03, owner: "Milkman test S.p.A.", postalCode: "37132" } },
];