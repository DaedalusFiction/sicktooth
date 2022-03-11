import { Grid, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ContinueReadingButton from "./ContinueReadingButton";

import { Link } from "react-router-dom";
import { marked } from "marked";

const StoryPreview = ({ story, size }) => {
    const [body, setBody] = useState("");
    useEffect(() => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "text";
        xhr.onload = (event) => {
            const charLength = size === "small" ? 150 : 450;
            let markdowntext = xhr.response.slice(0, charLength).trim() + "...";
            const newBody = marked.parse(markdowntext);
            setBody(newBody);
            document.getElementById(story.id).innerHTML = newBody;
        };
        xhr.open("GET", story.url);
        xhr.send();
    }, [size, story.title, story.url, story.id]);

    return (
        <Grid item xs={12} md={size === "small" ? 3 : 5}>
            <Box
                sx={[
                    {
                        padding: "1em",
                        marginBottom: "1em",
                        borderRadius: "3px",
                    },

                    {
                        "&:hover": {
                            backgroundColor: "rgb(56, 56, 56)",
                        },
                    },
                ]}
            >
                <Link to={`/stories/${story.id}`}>
                    <Typography gutterBottom className="text-minor">
                        [{story.genre}]
                    </Typography>
                    <Typography variant={size === "small" ? "h5" : "h4"}>
                        {story.title}
                    </Typography>
                    <Typography
                        className="text-minor"
                        sx={{
                            marginBottom: "1.5em",
                            fontStyle: "italic",
                        }}
                    >
                        by {story.author}
                    </Typography>
                    <div
                        id={story.id}
                        className={
                            size === "small"
                                ? "story-preview-small"
                                : "story-preview-large drop-cap"
                        }
                    ></div>
                </Link>
            </Box>
        </Grid>
    );
};

export default StoryPreview;
