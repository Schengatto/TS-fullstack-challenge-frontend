import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import Button from "shared/components/ui/Button";
import Select from "shared/components/form/DropDown";
import { Depot } from "features/orders-plan/models/depot";

const FormGroup = styled.div`
    .form-row {
        display: flex;
        margin: 1rem 0;
        column-gap: 1rem;

        div {
            flex: 1
        }
    }

    .form-actions {
        display: flex;
        margin: 1rem 0;
        column-gap: 1rem;

        div {
            flex: 1
        }
    }
`;

interface PlanFormProps {
    onCancel: () => void;
    onSubmit: (depot: Depot) => void;
}

const PlanForm: FunctionComponent<PlanFormProps> = ({ onCancel, onSubmit }) => {

    const [formFields, setFormFields] = useState<Depot | null>(null);

    const isFormValid = !!formFields;

    const handleDepotChange = (depot: Depot) => {
        setFormFields(depot);
    };

    const handleSubmit = (event: any): void => {
        event.preventDefault();
        if (!formFields) return;
        onSubmit(formFields);
    };

    const handleCancel = (): void => {
        onCancel();
    };

    const depots: Depot[] = [
        { id: "D0004", name: "Roma", addressInfo: { address: "Via Romolo", city: "Roma", latitude: 41.88, longitude: 12.46, owner: "Nerone s.r.l.", postalCode: "00186" } },
        { id: "D0003", name: "Torino", addressInfo: { address: "Via Cavour", city: "Torino", latitude: 45.07, longitude: 7.63, owner: "Belmonte s.r.l.", postalCode: "10121" } },
        { id: "D0001", name: "Verona", addressInfo: { address: "Via Germania", city: "Verona", latitude: 45.41, longitude: 10.97, owner: "Milkman test S.p.A.", postalCode: "37136" } },
        { id: "D0002", name: "Verona 2", addressInfo: { address: "Via dei test", city: "Verona", latitude: 45.43, longitude: 11.03, owner: "Milkman test S.p.A.", postalCode: "37132" } },
    ];
    const items: any[] = depots.map(d => ({ label: d.name, value: d }));
    items.unshift({ label: "", value: null });


    return (
        <FormGroup>
            <h3>Select Depot</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <Select items={items} onChange={handleDepotChange} />
                </div>
                <div className="form-actions">
                    <Button label="Cancel" onClick={handleCancel} />
                    <Button label="Start the new plan" disabled={!isFormValid} type="submit"></Button>
                </div>
            </form>
        </FormGroup>
    );
};

export default PlanForm;