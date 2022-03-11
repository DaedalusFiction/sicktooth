import { useState } from "react";
import {
    Container,
    Box,
    FormControl,
    TextField,
    Button,
    InputLabel,
    Paper,
    Select,
    MenuItem,
    Typography,
} from "@mui/material";

const Submit = () => {
    const [genre, setGenre] = useState(null);
    const [file, setFile] = useState(null);

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    const handleFileInputChange = (e) => {
        setFile(e.target.files[0]);
    };

    const submitForm = () => {
        console.log("Submit");
    };

    return (
        <Container maxWidth="sm">
            <Paper color="seconary" sx={{ padding: "1em" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em",
                    }}
                >
                    <Typography variant="h4" component="h2" color="primary">
                        Submit a Story for Judgment
                    </Typography>
                    <TextField
                        className="text-input"
                        id="author"
                        label="Author"
                        variant="outlined"
                    />
                    <TextField
                        className="text-input"
                        id="title"
                        label="Title"
                        variant="outlined"
                    />
                    <FormControl>
                        <InputLabel className="select-item" id="genre-label">
                            Genre
                        </InputLabel>
                        <Select
                            className="select-item"
                            labelId="genre-label"
                            id="genre"
                            value={genre}
                            label="Genre"
                            onChange={handleGenreChange}
                        >
                            <MenuItem className="select-item" value="Fiction">
                                Fiction
                            </MenuItem>
                            <MenuItem
                                className="select-item"
                                value="Non-Fiction"
                            >
                                Non-Fiction
                            </MenuItem>
                            <MenuItem className="select-item" value="Poetry">
                                Poetry
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="contained" component="label">
                        Select File
                        <input
                            id="storyFile"
                            type="file"
                            accept=".md"
                            hidden
                            onChange={handleFileInputChange}
                        />
                    </Button>
                    <Button variant="contained" onClick={submitForm}>
                        Upload
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Submit;
