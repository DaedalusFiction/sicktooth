import React from "react";
import { Outlet } from "react-router-dom";

const Stories = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Stories;
