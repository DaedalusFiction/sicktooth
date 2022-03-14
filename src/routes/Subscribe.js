import { Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const Subscribe = () => {
    const [email, setEmail] = useState(null);
    return (
        <Container>
            <Typography variant="h2">
                {" "}
                Subscribe to our Mailing List!
            </Typography>
            <TextField
                id="subscribe"
                label="Subscribe"
                color="secondary"
                value={email}
                focused
                variant="outlined"
            />
        </Container>
    );
};

export default Subscribe;
