import React, { FunctionComponent, useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import { NotFoundError } from "../../models/error";
import ordersService from "../../features/orders-management/services/orders-service";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import styled from "styled-components";
import { Order } from "../../features/orders-management/models/order";

export async function retrieveOrder({ params }: LoaderFunctionArgs): Promise<Order> {
    if (!params.id) {
        throw new Error("Expected params.id");
    }
    const order = await ordersService.getOrder(params.id);
    if (!order) {
        throw new NotFoundError(`Uh oh, I couldn't find an order with id "${params.id}"`);
    }
    return order;
}

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

    // const orderChart = (<OrderChart order={currentOrder}></OrderChart>);
    // const amountsForm = (
    //     <OrderAmountsForm
    //         order={currentOrder}
    //         onCancel={handleEditOrder.bind(null, false)}
    //         onSubmit={handleUpdateOrder} />
    // );
    return (
        <>
            <Card footer={!isEditMode && viewModeActions}>
                <div>
                    {/* {isEditMode ? amountsForm : orderChart} */}
                    <pre>{JSON.stringify(order, undefined, 2)}</pre>
                </div>
            </Card>
        </>
    );
};

export default OrderDetail;