import {
    AppBar,
    Box,
    Container,
    Grid,
    Typography,
    Button,
} from "@mui/material";
import ContinueReadingButton from "../components/ContinueReadingButton";
import { useEffect, useState } from "react";
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

const Home = () => {
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
                    const markdowntext = xhr.response;
                    // console.log(markdowntext);
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
            <Grid container spacing={4}>
                <Grid item xs={12} sm={5} sx={{ marginBottom: "1em" }}>
                    <Typography gutterBottom>
                        {stories && stories[0].createdAt}
                    </Typography>
                    <Typography variant="h4" component="h2">
                        {stories && stories[0].title}
                    </Typography>
                    <Typography gutterBottom>
                        {stories && stories[0].author}
                    </Typography>
                    <div
                        id={stories && stories[0].title}
                        className="story-body"
                    ></div>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <ContinueReadingButton story="submit" />
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={7}
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                    }}
                >
                    <Typography>
                        A Literary Magazine for Unhealthy People
                    </Typography>
                </Grid>

                {stories &&
                    stories.map((story, index) => {
                        if (index === 0) {
                            return <p></p>;
                        }
                        return (
                            <Grid
                                item
                                xs={12}
                                md={3}
                                sx={{ borderTop: "1px solid" }}
                            >
                                <Typography variant="h5">
                                    {stories[index].title}
                                </Typography>
                                <Typography gutterBottom>
                                    {stories[index].author}
                                </Typography>
                                <div id={stories[index].title}></div>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "end",
                                    }}
                                >
                                    <ContinueReadingButton story="submit" />
                                </Box>
                            </Grid>
                        );
                    })}

                <Grid item xs={12} md={3}>
                    <Typography variant="h6">Social Media</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
