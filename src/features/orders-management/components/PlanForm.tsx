import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import Button from "../../../components/ui/Button";
import { Depot } from "../models/depot";
import Select from "../../../components/form/DropDown";

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
        { id: "D0001", name: "Verona", address: { address: "Topo", city: "Verona", latitude: 2, longitude: 2, owner: "Enrico", postalCode: "30033" } },
        { id: "D0002", name: "Verona 2", address: { address: "Gatto", city: "Verona", latitude: 2, longitude: 2, owner: "Milkman", postalCode: "30033" } }
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
                    <Button label="Start the new plan" disabled={!isFormValid}></Button>
                </div>
            </form>
        </FormGroup>
    );
};

export default PlanForm;