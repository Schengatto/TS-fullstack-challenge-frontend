import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const Component = styled.div`
        position: absolute;
        top: 30%;
        width: 100%;
        text-align: center;

        div {
            width: 340px;
            margin: auto;
        }
`;

const Home: FunctionComponent = () => {
    const [start, setStart] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (start) {
            setTimeout(() => navigate("/orders-management"), 500);
        }
    }, [navigate, start]);

    const imageClassName = `animate__animated ${start && "animate__fadeOutRight"}`;
    const onStart = () => setStart(true);

    const headerContent = (<img height="80" src={require("../assets/images/logistics.png")} alt="home" className={imageClassName} />);
    const footerContent = (<Button label="Let's start" onClick={onStart}></Button>);

    return (
        <Component>
            <Card footer={footerContent} header={headerContent}>
                <div>
                    <h2>Front End Software Engineer Thecnical Challenge</h2>
                </div>
            </Card>
        </Component>
    );
};

export default Home;