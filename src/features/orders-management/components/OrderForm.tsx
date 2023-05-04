import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import InputText from "../../../components/form/InputText";
import Button from "../../../components/ui/Button";
import { generateRandomString } from "../../../utils/string-utils";
import { AddressInfo, Order, OrderStatus, Package } from "../models/order";
import TextArea from "../../../components/form/TextArea";
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
    const [invoiceId, setInvoiceId] = useState<string>(order?.invoiceId || "");
    const [notes, setNotes] = useState<string>(order?.notes || "");
    const [packages, setPackages] = useState<Package[]>(order?.packages || []);
    const [status, setStatus] = useState<OrderStatus>(order?.status || OrderStatus.OrderPlaced);
    const [isFormValid, setIsFormvalid] = useState<boolean>(false);

    useEffect(() => {
        setIsFormvalid(!!invoiceId && !!packages.length);
    }, [invoiceId, packages]);

    const handleSubmit = (event: any): void => {
        event.preventDefault();

        const currentOrder: Order = order
            ? { id: order.id, invoiceId, notes, packages, status }
            : { id: generateRandomString(6), invoiceId, notes, packages, status: OrderStatus.OrderPlaced };

        onSubmit(currentOrder);
    };

    const packagesTableHeaders = [
        { key: "id", label: "ID" },
        { key: "supplier", label: "Supplier City", parseFunction: (supplier: AddressInfo) => supplier.city },
        { key: "recipient", label: "Recipient City", parseFunction: (recipient: AddressInfo) => recipient.city },
        { key: "notes", label: "Notes" }
    ];

    const generateFakePackage = () => ({
        id: generateRandomString(8),
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

    const handleAddNewPackage = (): void => setPackages((prev: Package[]) => [...prev, generateFakePackage()]);

    const resetForm = (): void => {
        setInvoiceId(order?.invoiceId || "");
        setNotes(order?.notes || "");
        setPackages(order?.packages || []);
        setStatus(order?.status || OrderStatus.OrderPlaced);
    };

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
                        type="text"
                        value={order?.id || ""}
                        disabled />

                    <InputText
                        label="Status"
                        type="text"
                        value={status}
                        disabled />

                    <InputText
                        label="Invoice number"
                        required type="text"
                        value={invoiceId}
                        disabled={readonly}
                        onChange={(e) => setInvoiceId(e.target.value)} />
                </div>
                <div className="form-row">
                    <TextArea label="Notes" type="text" value={notes} disabled={readonly} onChange={(e) => setNotes(e.target.value)} />
                </div>

                <Table
                    title='Packages'
                    readonly={readonly}
                    headers={packagesTableHeaders}
                    items={packages}
                    searchKey="id" />

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