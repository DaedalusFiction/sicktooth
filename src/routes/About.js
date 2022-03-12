import { Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <Container maxWidth="sm" sx={{ padding: "10em 0 15em 0" }}>
            <Typography variant="h4" gutterBottom>
                About SICKTOOTH
            </Typography>
            <Typography>
                Many literary magazines believe that a smaller font size
                displays erudition and prestige. Here at SICKTOOTH, we believe
                that a larger font size is preferable.
            </Typography>
            <br />
            <Typography>
                If you have a story, essay, or poem with a larger-than-average
                font size, submit it{" "}
                <Link style={{ textDecoration: "underline" }} to="/submit">
                    here
                </Link>
                .
            </Typography>
        </Container>
    );
};

export default About;
