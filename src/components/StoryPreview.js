import { Grid, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ContinueReadingButton from "./ContinueReadingButton";
import { marked } from "marked";

const StoryPreview = ({ story, size }) => {
    const [body, setBody] = useState("");
    useEffect(() => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "text";
        xhr.onload = (event) => {
            const charLength = size === "small" ? 250 : 450;
            let markdowntext = xhr.response.slice(0, charLength).trim() + "...";
            const newBody = marked.parse(markdowntext);
            setBody(markdowntext);
        };
        xhr.open("GET", story.url);
        xhr.send();
    }, [size, story.title, story.url]);

    return (
        <Grid item xs={12} md={size === "small" ? 3 : 5}>
            <Typography gutterBottom className="text-minor">
                {story.date}
            </Typography>
            <Typography variant="h5">{story.title}</Typography>
            <Typography
                className="text-minor"
                sx={{
                    marginBottom: "1.5em",
                    fontStyle: "italic",
                }}
            >
                by {story.author}
            </Typography>
            {body}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "end",
                }}
            >
                <ContinueReadingButton story={story.title} />
            </Box>
        </Grid>
    );
};

export default StoryPreview;
