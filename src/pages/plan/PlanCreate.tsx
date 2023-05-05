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
import Button from "../../components/ui/Button";
import Select from "../../components/form/DropDown";
import { Depot } from "../../features/orders-management/models/depot";

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

    const handleOrderClick = (order: Order) => navigate(`/order/${order.id}`);

    const handleCreatePlan = async (order: Order) => {
        if (isFetchingData) return;

        setIsFetchingData(true);
        await ordersService.addOrder(order).finally(() => setIsFetchingData(false));
        handleCancel();
    };

    const pageTitle = (<PageTitle title="New Plan" />);
    const depots: Depot[] = [
        { id: "D0001", name: "Verona", address: { address: "Topo", city: "Verona", latitude: 2, longitude: 2, owner: "Enrico", postalCode: "30033" } },
        { id: "D0002", name: "Verona 2", address: { address: "Gatto", city: "Verona", latitude: 2, longitude: 2, owner: "Milkman", postalCode: "30033" } }
    ];

    const items: any[] = depots.map(d => ({ label: d.name, value: d }));
    items.unshift({ label: "", value: null });

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

                <form>
                    <Select items={items} onChange={() => null} />
                    <Button label="Start the new plan"></Button>
                </form>
            </Card>
        </Component>
    );
};

export default PlanCreate;