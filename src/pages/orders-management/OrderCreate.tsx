import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "../../components/ui/Card";
import { Order } from "../../features/orders-management/models/order";
import ordersService from "../../features/orders-management/services/orders-service";
import OrderForm from "../../features/orders-management/components/OrderForm";

const Component = styled.div`
    margin: 1rem;
`;

export const PageTitle = styled.div`
    text-align: center;
    font-variant: small-caps;
`;

const OrderCreate: FunctionComponent = () => {
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/orders");
    };

    const handleCreateOrder = async (order: Order) => {
        await ordersService.addOrder(order);
        handleCancel();
    };

    const pageTitle = (<PageTitle><h1>Create Order</h1></PageTitle>);

    return (
        <Component>
            <Card header={pageTitle}>
                <OrderForm
                    onCancel={handleCancel}
                    onSubmit={handleCreateOrder} />
            </Card>
        </Component>
    );
};

export default OrderCreate;