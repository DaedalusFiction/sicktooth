import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <Container sx={{ borderTop: "1px solid", marginTop: "1em" }}>
            <Box
                sx={{
                    margin: "0.5em 0",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography>Copyright 2022 by SICKTOOTH </Typography>
                <Link to="/">
                    <Button variant="text" color="secondary">
                        Home
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};

export default Footer;
