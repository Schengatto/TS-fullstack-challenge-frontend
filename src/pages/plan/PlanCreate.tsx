import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "shared/components/ui/Card";
import PageTitle from "shared/components/PageTitle";
import Table from "shared/components/ui/Table";
import { getUniqueValues } from "shared/utils/array-utils";
import { Order, OrderStatus } from "features/orders-management/models/order";
import ordersService from "features/orders-management/services/orders-service";
import planService from "features/orders-plan/services/plan-service";
import { Package } from "features/orders-management/models/package";
import PlanForm from "features/orders-plan/components/form/PlanForm";
import { Depot } from "features/orders-plan/models/depot";

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

    const handleCreatePlan = async (depot: Depot) => {
        if (isFetchingData) return;
        setIsFetchingData(true);
        planService.createPlan({ ordersId: orders.map(order => order.id!), depotId: depot.id }).finally(() => setIsFetchingData(false));
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
                    searchKeys={["id"]}
                    isLoading={isFetchingData}
                    onRowClick={handleOrderClick}
                />

                <PlanForm
                    onCancel={handleCancel}
                    onSubmit={handleCreatePlan} />
            </Card>
        </Component>
    );
};

export default PlanCreate;