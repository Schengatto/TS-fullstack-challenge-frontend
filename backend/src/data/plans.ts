import { PlanInfo } from "../models/depot";

export const MOCKED_DATA_PLANS: PlanInfo[] = [
    {
        id: "P0001",
        steps: [
            {
                location: {
                    address: "Via Germania",
                    city: "Verona",
                    latitude: 45.41,
                    longitude: 10.97,
                    owner: "Milkman test S.p.A.",
                    postalCode: "37136",
                },
            },
            {
                orderId: "O0001",
                packageCode: "P0001",
                location: {
                    owner: "Matteo Salerno",
                    address: "Via verde",
                    city: "Venezia",
                    latitude: 60,
                    longitude: 30,
                    postalCode: "20223",
                },
            },
            {
                orderId: "O0001",
                packageCode: "P0002",
                location: {
                    owner: "Tore Kappai",
                    address: "Via Edera",
                    city: "Treviso",
                    latitude: 60,
                    longitude: 30,
                    postalCode: "20223",
                },
            },
            {
                location: {
                    address: "Via Germania",
                    city: "Verona",
                    latitude: 45.41,
                    longitude: 10.97,
                    owner: "Milkman test S.p.A.",
                    postalCode: "37136",
                },
            },
        ],
    },
];
