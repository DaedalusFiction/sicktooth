import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

const Footer = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    };
    return (
        <Container sx={{ borderTop: "1px solid", marginTop: "3em" }}>
            <Box
                sx={{
                    margin: "0.5em 0",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography className="icon-copyright">
                    Copyright <AiOutlineCopyrightCircle /> 2022 by SICKTOOTH
                </Typography>
                <Link to="/">
                    <Button
                        variant="text"
                        color="secondary"
                        onClick={handleClick}
                    >
                        Home
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};

export default Footer;
