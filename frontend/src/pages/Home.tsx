import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "shared/components/ui/Button";
import Card from "shared/components/ui/Card";
import { RequestBuilder } from "shared/utils/request-builder";
import httpService from "shared/services/http-service";

const Component = styled.div`
        position: absolute;
        top: 25%;
        width: 100%;
        text-align: center;

        div {
            max-width: 340px;
            margin: auto;
        }

        .server-status {
            margin-bottom: 1rem;
        }
`;

const Home: FunctionComponent = () => {
    const [start, setStart] = useState(false);
    const [isApiAvailable, setIsApiAvailable] = useState(false);

    const navigate = useNavigate();

    const checkServerStatus = async () => {
        const request = new RequestBuilder().withURL("health").build();
        try {
            await httpService.get<string>(request);
            setIsApiAvailable(true);
        }
        catch (error) {
            setIsApiAvailable(false);
        }
    };

    useEffect(() => {
        checkServerStatus();
        const interval = setInterval(() => {
            checkServerStatus();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (start) {
            setTimeout(() => navigate("/order"), 500);
        }
    }, [navigate, start]);

    const imageClassName = `animate__animated ${start && "animate__fadeOutRight"}`;
    const onStart = () => setStart(true);

    const headerContent = (<img height="80" src={require("../assets/images/logistics.png")} alt="home" className={imageClassName} />);
    const footerContent = (<Button label="Let's start" onClick={onStart} disabled={!isApiAvailable} data-test="Home__Button__start"></Button>);

    return (
        <Component>
            <div className="server-status" data-test="Home__ServerStatus__container">
                Server Status: {isApiAvailable ? <span title="ONLINE">🟢</span> : <span title="OFFLINE">🔴</span>}
            </div>

            <Card footer={footerContent} header={headerContent}>
                <div>
                    <h2>Front End Software Engineer Thecnical Challenge</h2>
                </div>
            </Card>
        </Component>
    );
};

export default Home;