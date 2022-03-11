import { Container, Grid, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { db } from "../firebase";
import { marked } from "marked";
import useGetStories from "../hooks/useGetStories";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Story = () => {
    const [story, setStory] = useState(null);
    const params = useParams();
    const stories = useGetStories(3);

    useEffect(() => {
        async function getStory() {
            const storyRef = doc(db, "stories", params.id);
            const docSnap = await getDoc(storyRef);
            if (docSnap.exists()) {
                setStory(docSnap.data());

                const xhr = new XMLHttpRequest();
                xhr.responseType = "text";
                xhr.onload = (event) => {
                    let markdowntext = xhr.response;
                    const newBody = marked.parse(markdowntext);
                    document.getElementById(docSnap.id).innerHTML = newBody;
                };
                xhr.open("GET", docSnap.data().url);
                xhr.send();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        getStory();
    }, [params.id]);

    return (
        <Container>
            {story && (
                <Box sx={{ margin: "8em 0" }}>
                    <Typography sx={{ textAlign: "center" }}>
                        [{story.genre}]
                    </Typography>
                    <Typography variant="h3" sx={{ textAlign: "center" }}>
                        {story.title}
                    </Typography>
                    <Typography
                        sx={{
                            fontStyle: "italic",
                            textAlign: "center",
                        }}
                    >
                        {" "}
                        by {story.author}
                    </Typography>
                </Box>
            )}
            <Grid container spacing={7}>
                {story && (
                    <Grid item sm={12} md={8}>
                        <div
                            id={params.id}
                            className="story-body drop-cap"
                        ></div>
                    </Grid>
                )}
                <Grid item sm={12} md={4}>
                    <Box
                        sx={{
                            position: "sticky",
                            top: "0",
                            padding: "5rem 0 0 0",
                        }}
                    >
                        <Typography variant="h4" component="h2">
                            Latest Stories
                        </Typography>
                        {stories &&
                            stories.map((story) => {
                                return (
                                    <Link to={`/stories/${story.id}`}>
                                        <Box
                                            sx={[
                                                {
                                                    padding: ".5em",
                                                    margin: ".5em 0",
                                                    borderRadius: "3px",
                                                },
                                                {
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "rgb(56, 56, 56)",
                                                    },
                                                },
                                            ]}
                                        >
                                            <Typography variant="h6">
                                                {story.title}
                                            </Typography>
                                            <Typography
                                                className="text-minor"
                                                sx={{ fontStyle: "italic" }}
                                            >
                                                by {story.author}
                                            </Typography>
                                        </Box>
                                    </Link>
                                );
                            })}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Story;
