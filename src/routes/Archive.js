import {
    Container,
    Grid,
    Box,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import StoryPreview from "../components/StoryPreview";
import useGetStories from "../hooks/useGetStories";

const Archive = () => {
    const [shownStories, setShownStories] = useState(2);
    const stories = useGetStories(shownStories);
    const [visibleStories, setVisibleStories] = useState(stories);

    const handleSearchChange = (e) => {
        let newStories = stories.filter((story) =>
            story.title.toLowerCase().includes(e.target.value.toLowerCase())
        );

        setVisibleStories(newStories);
    };

    const loadMoreStories = () => {
        setShownStories(shownStories + 2);
    };

    useEffect(() => {
        setVisibleStories(stories);
    }, [stories]);

    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "3em",
                }}
            >
                <Typography variant="h2">Archive</Typography>
                <TextField
                    id="search"
                    label="Search"
                    color="secondary"
                    onChange={handleSearchChange}
                    focused
                    variant="outlined"
                />
            </Box>
            <Grid container spacing={4}>
                {visibleStories &&
                    visibleStories.map((story, index) => {
                        return (
                            <StoryPreview
                                story={story}
                                size="small"
                                key={index}
                            />
                        );
                    })}
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={loadMoreStories}
                    >
                        Load More Stories
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Archive;
