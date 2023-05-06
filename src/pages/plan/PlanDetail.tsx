import { FunctionComponent } from "react";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "shared/components/ui/Card";
import PageTitle from "shared/components/PageTitle";
import { PlanInfo } from "features/orders-plan/models/depot";
import plansService from "features/orders-plan/services/plan-service";
import { NotFoundError } from "shared/models/error";

export async function retrievePlan({ params }: LoaderFunctionArgs): Promise<PlanInfo> {
    if (!params.id) {
        throw new Error("Expected params.id");
    }
    const plan = await plansService.getPlan(params.id);
    if (!plan) {
        throw new NotFoundError(`Oops, there isn't a plan with id "${params.id}"`);
    }
    return plan;
}

const Component = styled.div`
    margin: 1rem;
`;

const PlanDetail: FunctionComponent = () => {

    const plan = useLoaderData() as PlanInfo;

    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/plan");
    };

    const pageTitle = (<PageTitle title={`Plan ${plan.id}`} />);

    return (
        <Component>
            <Card header={pageTitle}>

                {plan.depotId} - {plan.ordersId}
            </Card>
        </Component>
    );
};

export default PlanDetail;