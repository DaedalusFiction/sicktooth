import { Container, Grid, Box, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import {
    collection,
    doc,
    getDoc,
    query,
    orderBy,
    limit,
    getDocs,
} from "firebase/firestore";
import { ref, getDownloadURL, getBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { marked } from "marked";
import ContinueReadingButton from "../components/ContinueReadingButton";

const Archive = () => {
    const [stories, setStories] = useState(null);
    useEffect(() => {
        async function getStories() {
            const q = query(
                collection(db, "stories"),
                orderBy("createdAt", "desc"),
                limit(4)
            );

            const docsSnap = await getDocs(q);
            let newStories = [];
            docsSnap.docs.forEach((doc, index) => {
                newStories = [...newStories, doc.data()];

                const xhr = new XMLHttpRequest();
                xhr.responseType = "text";
                xhr.onload = (event) => {
                    let charLength = 250;

                    let markdowntext =
                        xhr.response.slice(0, charLength).trim() + "...";
                    const body = marked.parse(markdowntext);
                    document.getElementById(
                        `${newStories[index].title}`
                    ).innerHTML = body;
                };
                xhr.open("GET", doc.data().url);
                xhr.send();
            });
            setStories(newStories);
        }

        getStories();
    }, []);
    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Archives
            </Typography>
            <Grid container spacing={4}>
                {stories &&
                    stories.map((story, index) => {
                        return (
                            <Grid
                                item
                                key={index}
                                xs={12}
                                sm={6}
                                md={4}
                                sx={{ margin: "1em 0" }}
                            >
                                <Typography gutterBottom className="text-minor">
                                    {stories && stories[0].createdAt}
                                </Typography>
                                <Typography variant="h5">
                                    {stories[index].title}
                                </Typography>
                                <Typography
                                    className="text-minor"
                                    sx={{ marginBottom: "1.5em" }}
                                >
                                    by {stories[index].author}
                                </Typography>
                                <Typography
                                    className="story-body"
                                    id={stories[index].title}
                                    sx={{}}
                                ></Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "end",
                                    }}
                                >
                                    <ContinueReadingButton
                                        story={stories[index].title}
                                    />
                                </Box>
                            </Grid>
                        );
                    })}
            </Grid>
        </Container>
    );
};

export default Archive;
