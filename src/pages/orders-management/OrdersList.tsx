import React, { FunctionComponent } from "react";
import Table from "../../components/ui/Table";
import { Order, Package } from "../../features/orders-management/models/order";
import orordersServiceder from "../../features/orders-management/services/orders-service";
import { useNavigate, useLoaderData } from "react-router-dom";
import Button from "../../components/ui/Button";
import styled from "styled-components";

export async function retrieveOrders(): Promise<Order[]> {
    return await orordersServiceder.getOrders();
}

const Component = styled.div`
    margin: 5rem 1rem;
`;

const OrdersList: FunctionComponent = () => {
    const navigate = useNavigate();
    const orders = useLoaderData() as Order[] || new Array<Order>();

    const headers = [
        { key: "id", label: "ID" },
        { key: "status", label: "Status" },
        { key: "packages", label: "# packages", parseFunction: (packages: Package[]) => packages.length }
    ];

    const handleOrderClick = (order: Order) => navigate(`/orders/${order.id}`);

    const handleAddNewOrder = () => navigate("/orders/create");

    const addNewOrderButton = (
        <div data-test="ListOrders__Button__AddNew">
            <Button
                label="Add New Order"
                onClick={handleAddNewOrder} />
        </div>);

    return (
        <Component>
            <div data-test="ListOrders__Table">
                <Table
                    title='Orders'
                    items={orders}
                    headers={headers}
                    searchKey="id"
                    footer={addNewOrderButton}
                    onRowClick={handleOrderClick} />
            </div>
        </Component>
    );
};

export default OrdersList;