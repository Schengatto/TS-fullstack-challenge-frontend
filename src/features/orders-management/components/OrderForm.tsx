import { ChangeEvent, FunctionComponent, useState } from "react";
import styled from "styled-components";
import InputText from "../../../components/form/InputText";
import TextArea from "../../../components/form/TextArea";
import Button from "../../../components/ui/Button";
import { generateRandomString } from "../../../utils/string-utils";
import { Order, OrderStatus } from "../models/order";
import { AddressInfo } from "../models/address";
import { Package } from "../models/package";
import PackageForm from "./PackageForm";
import Table from "../../../components/ui/Table";

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

interface OrderFormProps {
    order?: Order;
    readonly?: boolean;
    onCancel: () => void;
    onSubmit: (order: Order) => void;
}

const OrderForm: FunctionComponent<OrderFormProps> = ({ order, readonly, onCancel, onSubmit }) => {

    const initialFormState: Order = order
        ? { ...order }
        : { id: "", status: OrderStatus.OrderPlaced, invoiceId: "", packages: [], notes: "" };

    const [formFields, setFormFields] = useState<Order>(initialFormState);
    const [selectedPackage, setSelectedPackage] = useState<Package | null | undefined>(undefined);

    const isFormValid = formFields.invoiceId && formFields.packages.length > 0;

    const handleSubmit = (event: any): void => {
        event.preventDefault();
        const { invoiceId, notes, packages, status } = formFields;

        const currentOrder: Order = order
            ? { id: order.id, invoiceId, notes, packages, status }
            : { id: generateRandomString(6), invoiceId, notes, packages, status: OrderStatus.OrderPlaced };

        onSubmit(currentOrder);
    };

    const packagesTableHeaders = [
        { key: "code", label: "Code" },
        { key: "supplierId", label: "Supplier" },
        { key: "destination", label: "Destination", parseFunction: (destination: AddressInfo) => `${destination.city} (${destination.postalCode})` },
        { key: "notes", label: "Notes" }
    ];

    const handleFormFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFormFields(state => ({ ...state, [name]: value }));
    };

    const handleAddNewPackage = (): void => {
        setSelectedPackage(null);
        // setFormFields((state) => ({ ...state, packages: [...state.packages, generateFakePackage()] }))
    };

    const resetForm = (): void => setFormFields(initialFormState);

    const handleCancel = (): void => {
        resetForm();
        onCancel();
    };

    const handleEditPackage = (packageInfo: Package) => {
        setSelectedPackage(packageInfo);
    };

    const isEditOrderLocked = !!readonly || selectedPackage !== undefined;

    return (
        <FormGroup>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <InputText
                        label="ID"
                        name="id"
                        type="text"
                        value={formFields.id}
                        data-test="OrderForm__Input__id"
                        disabled />

                    <InputText
                        label="Status"
                        name="status"
                        type="text"
                        value={formFields.status}
                        data-test="OrderForm__Input__status"
                        disabled />

                    <InputText
                        label="Invoice number"
                        name="invoiceId"
                        required type="text"
                        value={formFields.invoiceId}
                        data-test="OrderForm__Input__invoiceId"
                        disabled={isEditOrderLocked}
                        onChange={handleFormFieldChange} />
                </div>
                <div className="form-row">
                    <TextArea
                        label="Order Notes"
                        name="notes"
                        type="text"
                        value={formFields.notes}
                        data-test="OrderForm__Input__notes"
                        disabled={isEditOrderLocked}
                        onChange={handleFormFieldChange} />
                </div>

                {selectedPackage === undefined && (
                    <Table
                        title='Packages'
                        readonly={readonly}
                        headers={packagesTableHeaders}
                        items={formFields.packages}
                        searchKey="code"
                        onRowClick={handleEditPackage} />
                )}

                {!isEditOrderLocked && (
                    <div className="form-actions">
                        <Button label="Cancel" onClick={handleCancel} data-test="OrderForm__Button__cancel" />
                        <Button onClick={handleAddNewPackage} label="Add New Package" data-test="OrderForm__Button__addPackage" />
                        <Button label="Save" type="submit" disabled={!isFormValid} data-test="OrderForm__Button__save" />
                    </div>
                )}
            </form>

            {selectedPackage !== undefined &&
                (<PackageForm
                    packageInfo={selectedPackage}
                    onSubmit={() => () => console.log("not implemented")}
                    onCancel={() => setSelectedPackage(undefined)} />)
            }
        </FormGroup>
    );
};

export default OrderForm;