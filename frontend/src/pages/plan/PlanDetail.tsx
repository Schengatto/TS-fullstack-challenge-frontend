import { FunctionComponent } from "react";
import { LoaderFunctionArgs, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "shared/components/ui/Card";
import { PlanInfo } from "features/orders-plan/models/depot";
import plansService from "features/orders-plan/services/plan-service";
import { NotFoundError } from "shared/models/error";
import TrackingSteps from "features/orders-plan/components/TrackingSteps";
import Button from "shared/components/ui/Button";
import PageTitle from "shared/components/PageTitle";

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

    .plan-path {
        margin-bottom: 2rem;
    }
`;

const PlanDetail: FunctionComponent = () => {
    const plan = useLoaderData() as PlanInfo;
    const location = useLocation();
    const navigate = useNavigate();

    const handleBack = () => {
        const from = (location.state && location.state["from"]) ?? "/";
        navigate(from);
    };

    const actions = (
        <Button label="Back" onClick={handleBack} data-test="PlanDetails__Button__back" />
    );

    return (
        <Component>
            <PageTitle title={`Plan ${plan.id}`} />

            <Card footer={actions}>
                <div className="plan-path">
                    <h3>Plan Path</h3>
                    <TrackingSteps steps={plan.steps} />
                </div>
            </Card>
        </Component>
    );
};

export default PlanDetail;