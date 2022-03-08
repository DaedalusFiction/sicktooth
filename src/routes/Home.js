import {
    AppBar,
    Box,
    Container,
    Grid,
    Typography,
    Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import ContinueReadingButton from "../components/ContinueReadingButton";
import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL, getBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { marked } from "marked";

const Home = () => {
    const [heroStory, setHeroStory] = useState(null);
    useEffect(() => {
        async function getStories() {
            const docRef = doc(db, "stories", "test");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const author = docSnap.data().author;
                const title = docSnap.data().title;
                console.log(docSnap.data().author);

                getDownloadURL(ref(storage, "stories/test.md"))
                    .then((url) => {
                        // `url` is the download URL for 'images/stars.jpg'
                        // console.log(url);

                        const xhr = new XMLHttpRequest();
                        xhr.responseType = "text";
                        xhr.onload = (event) => {
                            const markdowntext = xhr.response;

                            const body = marked.parse(markdowntext);
                            console.log(title);
                            setHeroStory({
                                title: title,
                                author: author,
                                body: body,
                            });
                            document.getElementById("heroStoryBody").innerHTML =
                                body;
                        };
                        xhr.open("GET", url);
                        xhr.send();

                        // console.log(html);
                    })
                    .catch((error) => {
                        // Handle any errors
                    });
            }
        }
        getStories();
    }, []);

    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={5} sx={{ marginBottom: "1em" }}>
                    <Typography variant="h4" component="h2">
                        {heroStory && heroStory.title}
                    </Typography>
                    <Typography gutterBottom>
                        by {heroStory && heroStory.author}
                    </Typography>
                    <div id="heroStoryBody" className="story-body"></div>
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
                <Grid item xs={12} md={3} sx={{ borderTop: "1px solid" }}>
                    <Typography variant="h5">Blue Jays</Typography>
                    <Typography gutterBottom>by David Sorensen</Typography>
                    <Typography>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Quae rerum, libero, placeat praesentium
                        consequuntur ut aut at eum explicabo assumenda laborum
                        dolorum optio omnis quibusdam magni ipsam ipsum ratione
                        sit! Quisquam provident tempore dolorum obcaecati,
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <ContinueReadingButton story="submit" />
                    </Box>
                </Grid>

                <Grid item xs={12} md={3} sx={{ borderTop: "1px solid" }}>
                    <Typography variant="h5">1301 Gradus</Typography>
                    <Typography gutterBottom>by David Sorensen</Typography>
                    <Typography>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Quae rerum, libero, placeat praesentium
                        consequuntur ut aut at eum explicabo assumenda laborum
                        dolorum optio omnis quibusdam magni ipsam ipsum ratione
                        sit! Quisquam provident tempore dolorum obcaecati,
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <ContinueReadingButton story="submit" />
                    </Box>
                </Grid>

                <Grid item xs={12} md={3} sx={{ borderTop: "1px solid" }}>
                    <Typography variant="h5">Charlie the Robot</Typography>
                    <Typography gutterBottom>by David Sorensen</Typography>
                    <Typography>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Quae rerum, libero, placeat praesentium
                        consequuntur ut aut at eum explicabo assumenda laborum
                        dolorum optio omnis quibusdam magni ipsam ipsum ratione
                        sit! Quisquam provident tempore dolorum obcaecati,
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <ContinueReadingButton story="submit" />
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="h6">Social Media</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
