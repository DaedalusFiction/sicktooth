import {
    AppBar,
    Box,
    Container,
    Grid,
    Typography,
    Button,
} from "@mui/material";
import ContinueReadingButton from "../components/ContinueReadingButton";

import useGetStories from "../hooks/useGetStories";
import StoryPreview from "../components/StoryPreview";

const Home = () => {
    const stories = useGetStories(4);
    return (
        <Container>
            <Grid container spacing={4}>
                {stories && <StoryPreview story={stories[0]} size="large" />}
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
                    <Typography variant="h6">Social Media</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
