import { FunctionComponent, useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputText from "../../components/form/InputText";
import TextArea from "../../components/form/TextArea";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import { AddressInfo, Order } from "../../features/orders-management/models/order";
import ordersService from "../../features/orders-management/services/orders-service";
import { NotFoundError } from "../../models/error";

export async function retrieveOrder({ params }: LoaderFunctionArgs): Promise<Order> {
    if (!params.id) {
        throw new Error("Expected params.id");
    }
    const order = await ordersService.getOrder(params.id);
    if (!order) {
        throw new NotFoundError(`Oops, there isn't an order with id "${params.id}"`);
    }
    return order;
}

export const Component = styled.div`
    .detail__row {
        display: flex;
        margin: 1rem 0;
        column-gap: 1rem;

        div {
            flex: 1
        }
    }
`;

export const ButtonsGroup = styled.div`
    display: flex;

    button {
        margin: 0 1rem;
    }
`;

const OrderDetail: FunctionComponent = () => {
    const navigate = useNavigate();
    let order = useLoaderData() as Order;

    const [currentOrder, setCurrentOrder] = useState<Order>(order);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const handleBackToList = () => {
        navigate("/orders");
    };

    const handleEditOrder = (value: boolean) => {
        setIsEditMode(value);
    };

    const handleDeleteOrder = async () => {
        await ordersService.deleteOrder(order.id);
        handleBackToList();
    };

    const handleUpdateOrder = async (order: Order) => {
        await ordersService.updateOrder({ ...currentOrder, packages: [] });
        const updatedOrder = await ordersService.getOrder(currentOrder.id);
        if (!updatedOrder) {
            navigate("/error");
            return;
        }
        setCurrentOrder(updatedOrder);
        handleEditOrder(false);
    };

    const viewModeActions = (
        <ButtonsGroup>
            <Button label="Back To List" onClick={handleBackToList}></Button>
            <Button label="Edit Order" onClick={handleEditOrder.bind(null, true)}></Button>
            <Button label="Delete Order" onClick={handleDeleteOrder}></Button>
        </ButtonsGroup>
    );

    const packagesTableHeaders = [
        { key: "id", label: "ID" },
        { key: "supplier", label: "Supplier City", parseFunction: (supplier: AddressInfo) => supplier.city },
        { key: "recipient", label: "Recipient City", parseFunction: (recipient: AddressInfo) => recipient.city },
        { key: "notes", label: "Notes" }
    ];

    // const orderChart = (<OrderChart order={currentOrder}></OrderChart>);
    // const amountsForm = (
    //     <OrderAmountsForm
    //         order={currentOrder}
    //         onCancel={handleEditOrder.bind(null, false)}
    //         onSubmit={handleUpdateOrder} />
    // );
    return (
        <Component>
            <Card footer={!isEditMode && viewModeActions}>
                {/* {isEditMode ? amountsForm : orderChart} */}
                <div className="detail__row">
                    <InputText label="id" type="text" value={order.id} disabled />
                    <InputText label="Invoice number" type="text" value={order.invoiceId} disabled />
                </div>
                <div className="detail__row">
                    <TextArea label="Notes" type="text" value={order.notes} disabled />
                </div>
                <div>
                    <Table
                        title='Packages'
                        headers={packagesTableHeaders}
                        items={order.packages}
                        searchKey="id" />
                </div>
                {/* <pre>{JSON.stringify(order, undefined, 2)}</pre> */}
            </Card>
        </Component>
    );
};

export default OrderDetail;