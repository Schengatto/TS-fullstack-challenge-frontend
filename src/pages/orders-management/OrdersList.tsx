import { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import { Order, OrderStatus } from "../../features/orders-management/models/order";
import orderServices from "../../features/orders-management/services/orders-service";
import Card from "../../components/ui/Card";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Package } from "../../features/orders-management/models/package";
import { getUniqueValues } from "../../utils/array-utils";

const Component = styled.div`
    margin: 1rem;
`;

export const ButtonsGroup = styled.div`
    display: flex;
    margin: 1rem 0;
    column-gap: 1rem;

    div {
        flex: 1
    }
`;

const OrdersList: FunctionComponent = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

    const headers = [
        { key: "id", label: "ID" },
        { key: "packages", label: "# packages", parseFunction: (packages: Package[]) => packages.length },
        { key: "packages", label: "Cities", parseFunction: (packages: Package[]) => getUniqueValues(packages.flatMap(p => p.destination).map(d => d.city)).join(", ") },
    ];

    const ordersForPlan = orders.filter(order => order.status === OrderStatus.OrderPlaced);
    const ordersPlanned = orders.filter(order => order.status !== OrderStatus.OrderPlaced);

    useEffect(() => {
        setIsFetchingData(true);
        orderServices.getOrders()
            .then((orders) => setOrders(orders))
            .finally(() => setIsFetchingData(false));
    }, []);

    const handleOrderClick = (order: Order) => navigate(`/order/${order.id}`);
    const handleAddNewOrder = () => navigate("/order/create");
    const handleStartNewPlan = () => navigate("/plan/create");

    const pageTitle = (<PageTitle title="Orders List" />);

    const addNewOrderButton = (
        <ButtonsGroup>
            <Button
                label="Add New Order"
                onClick={handleAddNewOrder} />
            <Button
                label="Start New Plan"
                onClick={handleStartNewPlan} />
        </ButtonsGroup>);

    return (
        <Component>
            <Card header={pageTitle} footer={addNewOrderButton} data-test="ListOrders__Table">
                <Table
                    title='Orders ready for plan'
                    items={ordersForPlan}
                    headers={headers}
                    searchKey="id"
                    isLoading={isFetchingData}
                    onRowClick={handleOrderClick} />
            </Card>

            <Card data-test="ListOrders__Table">
                <Table
                    title='Orders processed'
                    items={ordersPlanned}
                    headers={headers}
                    searchKey="id"
                    readonly
                    isLoading={isFetchingData}
                    onRowClick={handleOrderClick} />
            </Card>
        </Component>
    );
};

export default OrdersList;