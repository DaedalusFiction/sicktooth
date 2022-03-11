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
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import { format } from "date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
const moment = require("moment");

const Admin = () => {
    const [file, setFile] = useState();
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState(null);

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    const upload = async () => {
        const author = document.getElementById("author").value;
        const title = document.getElementById("title").value;

        const storageRef = ref(storage, `stories/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const docRef = doc(collection(db, "stories"));
                    setDoc(docRef, {
                        id: docRef.id,
                        author: author,
                        title: title,
                        genre: genre,
                        createdAt: Date.now(),
                        date: date,
                        url: downloadURL,
                    });
                });
            }
        );
    };

    const handleFileInputChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <Container>
            <Paper color="seconary" sx={{ padding: "1em" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em",
                    }}
                >
                    <TextField id="author" label="Author" variant="outlined" />
                    <TextField id="title" label="Title" variant="outlined" />
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
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date of Publication"
                            value={date}
                            onChange={(newValue) => {
                                setDate(format(newValue, "MMMM d, yyyy"));
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
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
                    <Button variant="contained" onClick={upload}>
                        Upload
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Admin;
