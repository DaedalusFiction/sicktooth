import {
    Container,
    Grid,
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
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
                    flexWrap: "wrap",
                    gap: "2em",
                }}
            >
                <Typography variant="h2" gutterBottom sx={{ lineHeight: "0" }}>
                    Archive
                </Typography>
                <TextField
                    id="search"
                    label="Search"
                    color="secondary"
                    onChange={handleSearchChange}
                    focused
                    variant="outlined"
                />
            </Box>
            <FormControl color="secondary" sx={{ margin: "1em 0" }}>
                <FormLabel
                    id="genres-label"
                    sx={{ color: "rgb(224, 213, 207)" }}
                >
                    [Genre]
                </FormLabel>
                <RadioGroup
                    aria-labelledby="genres-label"
                    defaultValue="fiction"
                    name="genres"
                    row
                >
                    <FormControlLabel
                        value="fiction"
                        control={
                            <Radio
                                sx={{
                                    color: "rgb(224, 213, 207)",
                                    "&.Mui-checked": {
                                        color: "rgb(224, 213, 207)",
                                    },
                                }}
                            />
                        }
                        label="Fiction"
                    />
                    <FormControlLabel
                        value="nonfiction"
                        control={
                            <Radio
                                sx={{
                                    color: "rgb(224, 213, 207)",
                                    "&.Mui-checked": {
                                        color: "rgb(224, 213, 207)",
                                    },
                                }}
                            />
                        }
                        label="Non-fiction"
                    />
                    <FormControlLabel
                        value="poetry"
                        control={
                            <Radio
                                sx={{
                                    color: "rgb(224, 213, 207)",
                                    "&.Mui-checked": {
                                        color: "rgb(224, 213, 207)",
                                    },
                                }}
                            />
                        }
                        label="Poetry"
                    />
                </RadioGroup>
            </FormControl>

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
