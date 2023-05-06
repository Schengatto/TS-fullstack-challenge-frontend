import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "../../components/ui/Card";
import { Order, OrderStatus } from "../../features/orders-management/models/order";
import ordersService from "../../features/orders-management/services/orders-service";
import PageTitle from "../../components/PageTitle";
import orderServices from "../../features/orders-management/services/orders-service";
import Table from "../../components/ui/Table";
import { Package } from "../../features/orders-management/models/package";
import { getUniqueValues } from "../../utils/array-utils";
import PlanForm from "../../features/orders-management/components/PlanForm";

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
        orderServices.getOrders()
            .then((orders) => orders.filter(order => order.status === OrderStatus.OrderPlaced))
            .then((orders) => setOrders(orders))
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