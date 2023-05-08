import { ChangeEvent, FunctionComponent, useState } from "react";
import styled from "styled-components";
import InputText from "shared/components/form/InputText";
import TextArea from "shared/components/form/TextArea";
import Button from "shared/components/ui/Button";
import { AddressInfo } from "shared/models/address";
import { Package } from "features/orders-management/models/package";

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

export interface PackageFormProps {
    packageInfo: Package | null;
    readonly?: boolean;
    onCancel: () => void;
    onSubmit: (packageInfo: Package) => void;
}

const PackageForm: FunctionComponent<PackageFormProps> = ({ packageInfo, readonly, onCancel, onSubmit }) => {

    const initialAddressState: AddressInfo = {
        owner: "",
        address: "",
        city: "",
        latitude: 0,
        longitude: 0,
        postalCode: "",
        notes: "",
        phoneNumber: ""
    };

    const initialFormState: Package = packageInfo
        ? { ...packageInfo }
        : { code: "", notes: "", destination: { ...initialAddressState }, supplierId: "" };

    const [formFields, setFormFields] = useState<Package>(initialFormState);

    const isFormValid = formFields.code
        && formFields.destination.owner
        && formFields.destination.address
        && formFields.destination.city
        && formFields.destination.postalCode
        && formFields.destination.latitude
        && formFields.destination.longitude
        && formFields.supplierId;

    const handleSubmit = (event: any): void => {
        event.preventDefault();
        onSubmit(formFields);
    };

    const handleFormFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFormFields(state => ({ ...state, [name]: value }));
    };

    const handleDestinationFormFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFormFields(state => ({ ...state, destination: { ...state.destination, [name]: value } }));
    };

    const resetForm = (): void => setFormFields(initialFormState);

    const handleCancel = (): void => {
        resetForm();
        onCancel();
    };

    return (
        <FormGroup>
            <h3>Package Info</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <InputText
                        label="Code"
                        name="code"
                        type="text"
                        value={formFields.code}
                        required
                        onChange={handleFormFieldChange} />
                    <InputText
                        label="Supplier"
                        name="supplierId"
                        type="text"
                        value={formFields.supplierId}
                        required
                        onChange={handleFormFieldChange} />
                </div>
                <h5>Package Destiantion Info</h5>
                <div className="form-row">
                    <InputText
                        label="Recipient Name"
                        name="owner"
                        type="text"
                        value={formFields.destination.owner}
                        required
                        onChange={handleDestinationFormFieldChange} />
                    <InputText
                        label="City"
                        name="city"
                        type="text"
                        value={formFields.destination.city}
                        required
                        onChange={handleDestinationFormFieldChange} />
                    <InputText
                        label="Postal Code"
                        name="postalCode"
                        type="text"
                        value={formFields.destination.postalCode}
                        required
                        onChange={handleDestinationFormFieldChange} />
                </div>
                <div className="form-row">
                    <InputText
                        label="Road"
                        name="address"
                        type="text"
                        value={formFields.destination.address}
                        required
                        onChange={handleDestinationFormFieldChange} />
                </div>
                <div className="form-row">
                    <InputText
                        label="Latitude"
                        name="latitude"
                        type="number"
                        value={formFields.destination.latitude}
                        required
                        onChange={handleDestinationFormFieldChange} />
                    <InputText
                        label="Longitude"
                        name="longitude"
                        type="number"
                        value={formFields.destination.longitude}
                        required
                        onChange={handleDestinationFormFieldChange} />
                    <InputText
                        label="Phone number"
                        name="phoneNumber"
                        type="text"
                        value={formFields.destination.phoneNumber}
                        onChange={handleDestinationFormFieldChange} />
                </div>
                <div className="form-row">
                    <TextArea
                        label="Notes"
                        name="notes"
                        type="text"
                        value={formFields.notes}
                        disabled={readonly}
                        onChange={handleFormFieldChange} />
                </div>
                {!readonly &&
                    <div className="form-actions">
                        <Button label="Cancel" onClick={handleCancel} />
                        <Button label={packageInfo ? "Update Package" : "Add Package"} type="submit" disabled={!isFormValid} />
                    </div>
                }
            </form>
        </FormGroup>
    );
};

export default PackageForm;