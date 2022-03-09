import React from "react";
import { useParams } from "react-router-dom";

const Story = () => {
    const params = useParams();

    return <div>{params.title}</div>;
};

export default Story;
