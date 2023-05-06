import { PlanInfo } from "../models/depot";

const plans: PlanInfo[] = [
    {
        id: "P0001",
        steps: [
            {
                stepNumber: 1,
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
                stepNumber: 2,
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
                stepNumber: 3,
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
                stepNumber: 4,
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
    // { id: "P0002", depotId: "D0002" },
];

class PlanService {
    async createPlan(depotId: string, ordersId: string[]): Promise<boolean> {
        await this.delay(2500);
        return Promise.resolve(true);
    }

    async getPlan(id: string): Promise<PlanInfo | undefined> {
        await this.delay(500);
        return Promise.resolve(plans.find((m) => m.id === id));
    }

    private async delay(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}

const instance = new PlanService();
export default instance;
