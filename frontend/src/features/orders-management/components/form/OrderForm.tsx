import { ChangeEvent, FunctionComponent, useState } from "react";
import styled from "styled-components";
import InputText from "shared/components/form/InputText";
import TextArea from "shared/components/form/TextArea";
import Button from "shared/components/ui/Button";
import Table from "shared/components/ui/Table";
import { generateRandomString } from "shared/utils/string-utils";
import { Order, OrderStatus } from "features/orders-management/models/order";
import { Package } from "features/orders-management/models/package";
import PackageForm from "./PackageForm";
import { AddressInfo } from "shared/models/address";
import { parseDateTimeToString } from "shared/utils/date-utils";

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
        : { id: "", createAt: parseDateTimeToString(new Date()), status: OrderStatus.OrderPlaced, invoiceId: "", packages: [], notes: "" };

    const [formFields, setFormFields] = useState<Order>(initialFormState);
    const [selectedPackage, setSelectedPackage] = useState<Package | null | undefined>(undefined);

    const isFormValid = formFields.invoiceId && formFields.packages.length > 0;
    const isEditOrderLocked = !!readonly || selectedPackage !== undefined;

    const packagesTableHeaders = [
        { key: "code", label: "Code" },
        { key: "supplierId", label: "Supplier" },
        { key: "destination", label: "Destination", parseFunction: (destination: AddressInfo) => `${destination.city} (${destination.postalCode})` },
        { key: "notes", label: "Notes" }
    ];

    const handleSubmit = (event: any): void => {
        event.preventDefault();
        const { invoiceId, notes, packages, status } = formFields;

        const currentOrder: Order = order
            ? { id: order.id, invoiceId, notes, packages, status }
            : { id: generateRandomString(6), invoiceId, notes, packages, status: OrderStatus.OrderPlaced };

        onSubmit(currentOrder);
    };

    const handleFormFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFormFields(state => ({ ...state, [name]: value }));
    };

    const openNewPackageForm = (): void => setSelectedPackage(null);

    const upsertPackage = (packageInfo: Package) => {
        if (selectedPackage) {
            setFormFields(state => ({ ...state, packages: state.packages.filter(p => p.code !== selectedPackage?.code) }));
        }
        setFormFields(state => ({ ...state, packages: [...state.packages, packageInfo] }));
        setSelectedPackage(undefined);
    };

    const resetForm = (): void => setFormFields(initialFormState);

    const handleCancel = (): void => {
        resetForm();
        onCancel();
    };

    const handleEditPackage = (packageInfo: Package) => {
        setSelectedPackage(packageInfo);
    };

    return (
        <FormGroup>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <InputText
                        label="Date"
                        name="createAt"
                        type="text"
                        value={formFields.createAt}
                        data-test="OrderForm__Input__createAt"
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
                        searchKeys={["code"]}
                        emptyTableMessage="The order must contain at least one package"
                        onRowClick={handleEditPackage} />
                )}

                {!isEditOrderLocked && (
                    <div className="form-actions">
                        <Button label="Cancel" onClick={handleCancel} data-test="OrderForm__Button__cancel" />
                        <Button onClick={openNewPackageForm} label="Add New Package" data-test="OrderForm__Button__addPackage" />
                        <Button label="Save" type="submit" disabled={!isFormValid} data-test="OrderForm__Button__save" />
                    </div>
                )}
            </form>

            {selectedPackage !== undefined &&
                (<PackageForm
                    packageInfo={selectedPackage}
                    onSubmit={upsertPackage}
                    onCancel={() => setSelectedPackage(undefined)} />)
            }
        </FormGroup>
    );
};

export default OrderForm;