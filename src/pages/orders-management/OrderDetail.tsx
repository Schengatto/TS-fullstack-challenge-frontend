import { FunctionComponent, useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import OrderForm from "../../features/orders-management/components/OrderForm";
import { Order } from "../../features/orders-management/models/order";
import ordersService from "../../features/orders-management/services/orders-service";
import { NotFoundError } from "../../models/error";
import PageTitle from "../../components/PageTitle";

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
    margin: 1rem;

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
    margin: 1rem 0;
    column-gap: 1rem;

    div {
        flex: 1
    }
`;

const OrderDetail: FunctionComponent = () => {
    const navigate = useNavigate();
    const order = useLoaderData() as Order;

    const [currentOrder, setCurrentOrder] = useState<Order>(JSON.parse(JSON.stringify(order)));
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const handleBackToList = () => {
        navigate("/order");
    };

    const handleEditOrder = (value: boolean) => {
        setIsEditMode(value);
    };

    const handleCancelPendingChanges = () => {
        setCurrentOrder(JSON.parse(JSON.stringify(order)));
        handleEditOrder(false);
    };

    const handleDeleteOrder = async () => {
        if (!order.id) return;
        await ordersService.deleteOrder(order.id);
        handleBackToList();
    };

    const handleUpdateOrder = async (order: Order) => {
        if (!order.id) return;
        await ordersService.updateOrder(order);
        const updatedOrder = await ordersService.getOrder(currentOrder.id!);
        if (!updatedOrder) {
            navigate("/error");
            return;
        }
        setCurrentOrder(updatedOrder);
        handleEditOrder(false);
    };

    const viewModeTitle = (<PageTitle title={isEditMode ? "Update Order" : "Order Detail"} />);

    const viewModeActions = (
        <ButtonsGroup>
            <Button label="Back To List" onClick={handleBackToList}></Button>
            <Button label="Edit Order" onClick={handleEditOrder.bind(null, true)}></Button>
            <Button label="Delete Order" onClick={handleDeleteOrder}></Button>
        </ButtonsGroup>
    );

    return (
        <Component>
            <Card header={viewModeTitle} footer={!isEditMode && viewModeActions}>
                <OrderForm
                    readonly={!isEditMode}
                    order={currentOrder}
                    onCancel={handleCancelPendingChanges}
                    onSubmit={handleUpdateOrder} />
            </Card>
        </Component>
    );
};

export default OrderDetail;