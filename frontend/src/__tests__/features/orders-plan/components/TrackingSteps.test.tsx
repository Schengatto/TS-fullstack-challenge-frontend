import { render } from "@testing-library/react";
import TrackingSteps, { TrackingStepsProps } from "features/orders-plan/components/TrackingSteps";
import { PlanStep } from "features/orders-plan/models/depot";

const makeSut = (props: TrackingStepsProps) => {
    return render(<TrackingSteps {...props} />);
};

test("Should render correctly", async () => {
    const steps: PlanStep[] = [
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
    ];

    const { getByTestId } = makeSut({ steps });
    const container = getByTestId("TrackingSteps__Container");
    expect(container).toBeInTheDocument();
});