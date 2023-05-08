import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "shared/components/ui/Button";
import Table from "shared/components/ui/Table";
import Card from "shared/components/ui/Card";
import { getUniqueValues } from "shared/utils/array-utils";
import orderServices from "features/orders-management/services/orders-service";
import { Order, OrderStatus } from "features/orders-management/models/order";
import { Package } from "features/orders-management/models/package";
import PageTitle from "shared/components/ui/PageTitle";

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
        { key: "status", label: "Status" },
    ];

    const ordersForPlan = orders.filter(order => order.status === OrderStatus.OrderPlaced);
    const ordersPlanned = orders.filter(order => order.status !== OrderStatus.OrderPlaced);

    useEffect(() => {
        setIsFetchingData(() => true);
        orderServices.getOrders()
            .then((orders) => setOrders(orders))
            .finally(() => setIsFetchingData(() => false));
    }, []);

    const handleOrderClick = (order: Order) => navigate(`/order/${order.id}`);
    const handleAddNewOrder = () => navigate("/order/create");
    const handleStartNewPlan = () => navigate("/plan/create");

    const addNewOrderButton = (
        <ButtonsGroup>
            <Button
                label="Add New Order"
                onClick={handleAddNewOrder} />
            <Button
                label="Start New Plan"
                onClick={handleStartNewPlan}
                disabled={!ordersForPlan.length} />
        </ButtonsGroup>);

    return (
        <Component>
            <PageTitle title="Orders List" data-test="OrdersList__Title__container" />

            <Card footer={addNewOrderButton}>
                <Table
                    title='Orders ready for plan'
                    items={ordersForPlan}
                    headers={headers}
                    searchKeys={["id", "status", "invoiceId"]}
                    isLoading={isFetchingData}
                    data-test="OrderList__Table__readyOrders"
                    onRowClick={handleOrderClick} />
            </Card>

            <Card className="mt-3" >
                <Table bgColor="#71baffa3"
                    title='Orders processed'
                    items={ordersPlanned}
                    headers={headers}
                    searchKeys={["id", "status", "invoiceId"]}
                    isLoading={isFetchingData}
                    data-test="OrderList__Table__processedOrders"
                    onRowClick={handleOrderClick} />
            </Card>
        </Component>
    );
};

export default OrdersList;