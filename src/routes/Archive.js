import { Container, Grid, Box, Typography } from "@mui/material";
import React from "react";

import StoryPreview from "../components/StoryPreview";
import useGetStories from "../hooks/useGetStories";

const Archive = () => {
    const stories = useGetStories(20);
    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Archives
            </Typography>
            <Grid container spacing={4}>
                {stories &&
                    stories.map((story, index) => {
                        return (
                            <StoryPreview
                                story={story}
                                size="small"
                                key={index}
                            />
                        );
                    })}
            </Grid>
        </Container>
    );
};

export default Archive;
