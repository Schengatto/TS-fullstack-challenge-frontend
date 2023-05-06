import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "shared/components/ui/Card";
import PageTitle from "shared/components/PageTitle";
import Table from "shared/components/ui/Table";
import { getUniqueValues } from "shared/utils/array-utils";
import { Order, OrderStatus } from "@order-management/models/order";
import ordersService from "@order-management/services/orders-service";
import { Package } from "@order-management/models/package";
import PlanForm from "@order-management/components/form/PlanForm";

const Component = styled.div`
    margin: 1rem;
`;

const PlanCreate: FunctionComponent = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

    const headers = [
        { key: "id", label: "ID" },
        { key: "packages", label: "# packages", parseFunction: (packages: Package[]) => packages.length },
        { key: "packages", label: "Cities", parseFunction: (packages: Package[]) => getUniqueValues(packages.flatMap(p => p.destination).map(d => d.city)).join(", ") },
    ];

    useEffect(() => {
        setIsFetchingData(true);
        ordersService.getOrders()
            .then((orders: Order[]) => orders.filter(order => order.status === OrderStatus.OrderPlaced))
            .then((orders: Order[]) => setOrders(orders))
            .finally(() => setIsFetchingData(false));
    }, []);

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/order");
    };

    const handleOrderClick = (order: Order) => navigate(`/order/${order.id}`, { state: { from: "/plan/create" } });

    const handleCreatePlan = async (order: Order) => {
        if (isFetchingData) return;

        setIsFetchingData(true);
        await ordersService.addOrder(order).finally(() => setIsFetchingData(false));
        handleCancel();
    };

    const pageTitle = (<PageTitle title="New Plan" />);

    return (
        <Component>
            <Card header={pageTitle}>
                <Table
                    title='Orders added in the new plan'
                    items={orders}
                    headers={headers}
                    searchKey="id"
                    isLoading={isFetchingData}
                    onRowClick={handleOrderClick}
                />

                <PlanForm
                    onCancel={handleCancel}
                    onSubmit={() => null} />
            </Card>
        </Component>
    );
};

export default PlanCreate;