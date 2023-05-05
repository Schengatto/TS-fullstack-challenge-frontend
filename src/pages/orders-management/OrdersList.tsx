import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import { Order } from "../../features/orders-management/models/order";
import orderServices from "../../features/orders-management/services/orders-service";
import { Package } from "../../features/orders-management/models/package";

const Component = styled.div`
    margin: 5rem 1rem;
`;

const OrdersList: FunctionComponent = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

    useEffect(() => {
        setIsFetchingData(true);
        orderServices.getOrders()
            .then((orders) => setOrders(orders))
            .finally(() => setIsFetchingData(false));
    }, []);

    const navigate = useNavigate();

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
                    isLoading={isFetchingData}
                    onRowClick={handleOrderClick} />
            </div>
        </Component>
    );
};

export default OrdersList;