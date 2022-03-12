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
import { storage } from "../firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import Notification from "../components/Notification";
import emailjs from "@emailjs/browser";
const Submit = () => {
    const [author, setAuthor] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [file, setFile] = useState(null);

    //Notification
    const [open, setOpen] = useState(false);

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFileInputChange = (e) => {
        setFile(e.target.files[0]);
    };

    const submitForm = () => {
        console.log("Submit");
        const storageRef = ref(storage, `submissions/${author}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {},
            () => {
                setOpen(true);
            }
        );
        var templateParams = {
            author: author,
            title: title,
            email: email,
            genre: genre,
        };

        emailjs
            .send(
                "service_tmo76bn",
                "template_pfang7n",
                templateParams,
                "aMDOy4kUud9rd0Yg9"
            )
            .then(
                function (response) {
                    console.log("SUCCESS!", response.status, response.text);
                },
                function (error) {
                    console.log("FAILED...", error);
                }
            );

        setTitle("");
        setAuthor("");
        setGenre("");
        setEmail("");
        setFile(null);
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
                    <Typography
                        variant="h4"
                        component="h2"
                        color="primary"
                        sx={{ textAlign: "center" }}
                    >
                        Submit a Story for Judgment
                    </Typography>
                    <Typography
                        color="primary"
                        sx={{
                            margin: "0 1rem",
                            textAlign: "justify",
                        }}
                    >
                        Stories submitted must be your own and must be eligible
                        for publication. We acquire North American publication
                        rights for a period of one year from time of acceptance.
                        Writer retains all other rights. A one-time payment of
                        $25 USD will be remitted upon publication.
                    </Typography>
                    <TextField
                        className="text-input"
                        value={author}
                        onChange={handleAuthorChange}
                        id="author"
                        label="Author"
                        variant="outlined"
                    />
                    <TextField
                        className="text-input"
                        value={title}
                        onChange={handleTitleChange}
                        id="title"
                        label="Title"
                        variant="outlined"
                    />
                    <TextField
                        className="text-input"
                        value={email}
                        onChange={handleEmailChange}
                        id="email"
                        label="Email"
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
                    <Typography color="primary" sx={{ margin: "0 1em" }}>
                        Upload a .docx, .doc, or .rtf
                    </Typography>
                    <Button variant="contained" component="label">
                        Select File
                        <input
                            id="storyFile"
                            type="file"
                            accept=".docx, .doc, .rtf"
                            hidden
                            onChange={handleFileInputChange}
                        />
                    </Button>
                    <Button variant="contained" onClick={submitForm}>
                        Submit
                    </Button>
                    <Notification
                        open={open}
                        setOpen={setOpen}
                        message="Submission Received!!"
                    />
                </Box>
            </Paper>
        </Container>
    );
};

export default Submit;
