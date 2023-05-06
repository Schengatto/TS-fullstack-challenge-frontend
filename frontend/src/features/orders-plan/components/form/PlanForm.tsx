import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import Button from "shared/components/ui/Button";
import Select from "shared/components/form/DropDown";
import { MOCKED_DATA_DEPOTS } from "features/orders-plan/data/depots";

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
    disabled?: boolean;
    onCancel: () => void;
    onSubmit: (depotId: string) => void;
}

const PlanForm: FunctionComponent<PlanFormProps> = ({ disabled, onCancel, onSubmit }) => {

    const [depotId, setFormFields] = useState<string | null>(null);

    const isFormValid = !!depotId && !disabled;

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

    const items: any[] = MOCKED_DATA_DEPOTS.map(d => ({ label: d.name, value: d.id }));
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