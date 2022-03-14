import {
    AppBar,
    Box,
    Container,
    Grid,
    Typography,
    Button,
    Divider,
} from "@mui/material";

import useGetStories from "../hooks/useGetStories";
import StoryPreview from "../components/StoryPreview";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
    const stories = useGetStories(4);
    return (
        <Container>
            <Grid
                item
                xs={12}
                sm={12}
                sx={{
                    display: { xs: "flex", md: "none" },
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <Typography>A Literary Magazine for</Typography>
                <Typography
                    sx={{
                        color: "rgb(153, 0, 51)",
                        margin: "0 .5em",
                        fontWeight: "bold",
                    }}
                >
                    Unhealthy
                </Typography>
                <Typography>People</Typography>
            </Grid>
            <Grid container spacing={2}>
                {stories && <StoryPreview story={stories[0]} size="large" />}
                <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                        display: { xs: "none", md: "flex" },
                        justifyContent: "end",
                        alignItems: "center",
                    }}
                >
                    <Typography>A Literary Magazine for</Typography>
                    <Link to="/about">
                        <Typography
                            sx={[
                                {
                                    color: "rgb(153, 0, 51)",
                                    margin: "0 .5em 0 .5em",
                                    fontWeight: "bold",
                                },
                                {
                                    "&:hover": {
                                        color: "rgb(0, 153, 13)",
                                    },
                                },
                            ]}
                        >
                            Unhealthy
                        </Typography>
                    </Link>
                    <Typography>People</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ borderTop: "1px solid" }}></Box>
                </Grid>
                {stories &&
                    stories.map((story, index) => {
                        if (index === 0) {
                            return <p key={index}></p>;
                        }
                        return (
                            <StoryPreview
                                story={stories[index]}
                                key={index}
                                size="small"
                                sx={{ borderTop: "1px solid" }}
                            />
                        );
                    })}

                <Grid item xs={12} md={3}>
                    <Typography
                        className="text-minor"
                        sx={{ margin: ".5rem 0" }}
                    >
                        [Links]
                    </Typography>
                    <Box sx={{}}>
                        <FaFacebook
                            style={{
                                color: "rgb(224, 213, 207)",
                                marginRight: ".5em",
                            }}
                        />
                        <FaTwitter
                            style={{
                                color: "rgb(224, 213, 207)",
                                marginRight: ".5em",
                            }}
                        />
                        <FaInstagram
                            style={{
                                color: "rgb(224, 213, 207)",
                                marginRight: ".5em",
                            }}
                        />
                    </Box>
                    <Link to="subscribe" className="hover-underline">
                        Subscribe
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
