import { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "shared/components/ui/Button";
import Select from "shared/components/form/Select";
import depotService from "features/orders-plan/services/depot-service";
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

interface DepotItem {
    label: string;
    value: string | null;
}

interface PlanFormProps {
    disabled?: boolean;
    onCancel: () => void;
    onSubmit: (depotId: string) => void;
}

const PlanForm: FunctionComponent<PlanFormProps> = ({ disabled, onCancel, onSubmit }) => {

    const [depots, setDepots] = useState<Depot[]>([]);
    const [depotId, setFormFields] = useState<string | null>(null);


    const isFormValid = !!depotId && !disabled;
    const items: DepotItem[] = [{ label: "", value: null }, ...depots.map(d => ({ label: d.name, value: d.id }))];

    useEffect(() => {
        depotService.getDepots()
            .then(depots => setDepots(depots));
    }, []);


    const handleDepotChange = (depotId: string) => {
        setFormFields(() => depotId);
    };

    const handleSubmit = (event: any): void => {
        event.preventDefault();
        if (!depotId) return;
        onSubmit(depotId);
    };

    const handleCancel = (): void => {
        onCancel();
    };

    return (
        <FormGroup>
            <h3>Select Depot</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <Select items={items} onChange={handleDepotChange} data-test="PlanForm__Select__depot" />
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