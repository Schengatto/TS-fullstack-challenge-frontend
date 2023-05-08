import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "shared/components/ui/Card";
import Table from "shared/components/ui/Table";
import { getUniqueValues } from "shared/utils/array-utils";
import { Order, OrderStatus } from "features/orders-management/models/order";
import ordersService from "features/orders-management/services/orders-service";
import planService from "features/orders-plan/services/plan-service";
import { Package } from "features/orders-management/models/package";
import PlanForm from "features/orders-plan/components/form/PlanForm";
import PageTitle from "shared/components/ui/PageTitle";

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
        (async () => {
            setIsFetchingData(true);
            try {
                const orders = await ordersService.getOrders();
                const placedOrders = orders.filter(order => order.status === OrderStatus.OrderPlaced);
                setOrders(placedOrders);
            } catch (e) {
                throw new Error("Error fetching orders: " + e);
            } finally {
                setIsFetchingData(false);
            }
        })();
    }, []);

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/order");
    };

    const handleOrderClick = (order: Order) => navigate(`/order/${order.id}`, { state: { from: "/plan/create" } });

    const handleCreatePlan = async (depotId: string) => {
        if (isFetchingData) return;
        setIsFetchingData(true);
        await planService.createPlan(depotId, orders.map(order => order.id!)).finally(() => setIsFetchingData(false));
        navigate("/order");
    };

    return (
        <Component>
            <PageTitle title="New Plan" data-test="PlanCreate__Title__container" />

            <Card>
                <Table
                    title='Orders added in the new plan'
                    items={orders}
                    headers={headers}
                    searchKeys={["id"]}
                    isLoading={isFetchingData}
                    onRowClick={handleOrderClick}
                />

                <PlanForm
                    disabled={!orders.length}
                    onCancel={handleCancel}
                    onSubmit={handleCreatePlan} />
            </Card>
        </Component>
    );
};

export default PlanCreate;