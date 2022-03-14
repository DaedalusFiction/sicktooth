import { Grid, Box, Typography, Button } from "@mui/material";
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
            const charLength = size === "small" ? 200 : 750;
            let markdowntext = xhr.response.slice(0, charLength).trim() + "...";
            //remove " if first character and preview is large so dropcap works properly
            if (markdowntext.charAt(0) === `"` && story === "large") {
                markdowntext = markdowntext.substring(1);
            }
            const newBody = marked.parse(markdowntext);
            setBody(newBody);
            document.getElementById(story.id).innerHTML = newBody;
        };
        xhr.open("GET", story.url);
        xhr.send();
    }, [size, story]);

    return (
        <Grid item xs={12} md={size === "small" ? 3 : 6}>
            <Box
                sx={[
                    {
                        padding: "0.5em",
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
