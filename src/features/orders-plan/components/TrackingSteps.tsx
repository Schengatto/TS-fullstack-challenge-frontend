import { FunctionComponent } from "react";
import styled from "styled-components";
import { PlanStep } from "features/orders-plan/models/depot";

const Component = styled.div`
    .form-row {
        display: flex;
        margin: 1rem 0;
        column-gap: 1rem;

        div {
            flex: 1
        }
    }

    .form-actions {
        display: flex;
        margin: 1rem 0;
        column-gap: 1rem;

        div {
            flex: 1
        }
    }
`;

const Step = styled.div`

    .step-info {
        display: grid;
        grid-template-columns: 80px auto;

        .step-circle {
            border-radius: 32px;
            width: 42px;
            height: 42px;
            border: 2px solid var(--primary-bg-color);
            background: var(--primary-hover-bg-color);
        }

        .step-description {
            margin-top: 5px;
            width: 100%;
        }
    }
    .step-line {
        background: var(--primary-bg-color);
        width: 5px;
        height: 50px;
        margin-left: 21px;
    }
`;

interface TrackingStepsProps {
    steps: PlanStep[]
}

const TrackingSteps: FunctionComponent<TrackingStepsProps> = ({ steps }) => {

    const renderStep = (step: PlanStep, index: number) => (
        <Step key={index}>
            <div className="step-info">
                <div className="step-circle" />
                <div className="step-description">
                    <div>{step.location.owner} - {step.location.city}</div>
                    {step.orderId && <div>Order ID: {step.orderId} - Package ID: {step.packageCode}</div>}
                </div>
            </div>
            {index < steps.length - 1 && <div className="step-line" />}
        </Step>
    );

    return (
        <Component>
            {steps.map((step, index) => renderStep(step, index))}
        </Component>
    );
};

export default TrackingSteps;