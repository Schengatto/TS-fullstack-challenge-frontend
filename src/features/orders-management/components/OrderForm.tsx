import { ChangeEvent, FunctionComponent, useState } from "react";
import styled from "styled-components";
import InputText from "../../../components/form/InputText";
import TextArea from "../../../components/form/TextArea";
import Button from "../../../components/ui/Button";
import Table from "../../../components/ui/Table";
import { generateRandomString } from "../../../utils/string-utils";
import { AddressInfo, Order, OrderStatus, Package } from "../models/order";

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
        { key: "supplier", label: "Supplier City", parseFunction: (supplier: AddressInfo) => supplier.city },
        { key: "recipient", label: "Recipient City", parseFunction: (recipient: AddressInfo) => recipient.city },
        { key: "notes", label: "Notes" }
    ];

    const generateFakePackage = () => ({
        code: generateRandomString(8),
        recipient: {
            address: "Via scura",
            city: "Milano",
            coordinates: { latitude: 10, longitude: 20 },
            postalCode: generateRandomString(5)
        },
        supplier: {
            address: "Via rossa",
            city: "Bologna",
            coordinates: { latitude: 40, longitude: 50 },
            postalCode: generateRandomString(5)
        }
    });

    const handleFormFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFormFields(state => ({ ...state, [name]: value }));
    };

    const handleAddNewPackage = (): void => setFormFields((state) => ({ ...state, packages: [...state.packages, generateFakePackage()] }));

    const resetForm = (): void => setFormFields(initialFormState);

    const handleCancel = (): void => {
        resetForm();
        onCancel();
    };

    return (
        <FormGroup>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <InputText
                        label="ID"
                        name="id"
                        type="text"
                        value={formFields.id}
                        disabled />

                    <InputText
                        label="Status"
                        name="status"
                        type="text"
                        value={formFields.status}
                        disabled />

                    <InputText
                        label="Invoice number"
                        name="invoiceId"
                        required type="text"
                        value={formFields.invoiceId}
                        disabled={readonly}
                        onChange={handleFormFieldChange} />
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

                <Table
                    title='Packages'
                    readonly={readonly}
                    headers={packagesTableHeaders}
                    items={formFields.packages}
                    searchKey="code" />

                {!readonly &&
                    <div className="form-actions">
                        <Button label="Cancel" onClick={handleCancel} />
                        <Button onClick={handleAddNewPackage} label="Add New Package" />
                        <Button label="Save" type="submit" disabled={!isFormValid} />
                    </div>
                }
            </form>
        </FormGroup>
    );
};

export default OrderForm;