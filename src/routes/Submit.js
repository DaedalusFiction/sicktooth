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
    createTheme,
} from "@mui/material";
import { storage } from "../firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import Notification from "../components/Notification";
import emailjs from "@emailjs/browser";
const Submit = () => {
    const [author, setAuthor] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState(false);

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

    const handleFileInputChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleEmailChange = (e) => {
        if (ValidateEmail(e.target.value)) {
            setError(false);
        } else {
            setError(true);
        }
        setEmail(e.target.value);
    };

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true;
        }
        console.log("invalid email");
        return false;
    }

    const submitForm = async () => {
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

        const docRef = doc(db, "submissions", author);
        const uploadDocTask = await setDoc(docRef, templateParams);

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
        setError(false);
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ padding: "1em" }}>
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
                        Submit Your Work
                    </Typography>
                    <Typography
                        color="primary"
                        sx={{
                            margin: "0 1.1rem",
                            textAlign: "justify",
                        }}
                    >
                        Submissions must be your own. For short stories and
                        creative non-fiction, any length is fine, though 3-5000
                        words is ideal. For poetry, please submit 3-8 poems at a
                        time. Simultaneous submissions are permitted, but please
                        notify us immediately if your manuscript is accepted
                        elsewhere. Excerpts of larger works will be considered
                        so long as they have not been published electronically
                        elsewhere. SICKTOOTH acquires First Electronic Rights
                        and archival rights for a period of three years. All
                        submissions will be read, and you can expect a response
                        within two weeks. A one-time payment of $25 will be paid
                        through PayPal for each short story, article, or
                        collection of poems. If you do not hear back by then,
                        feel free to contact us about the status of your
                        manuscript.
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
                        error={error}
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
                        Upload a .docx, .doc, or .rtf file
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
