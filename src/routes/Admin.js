import {
    Container,
    Box,
    TextField,
    Paper,
    Input,
    Button,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
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
                    setDoc(doc(collection(db, "stories")), {
                        author: author,
                        title: title,
                        genre: genre,
                        createdAt: Date.now(),
                        date: moment().format("MMMM Do YYYY"),
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
                <TextField
                    id="author"
                    label="Author"
                    variant="outlined"
                    color="secondary"
                    focused
                />
                <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    color="secondary"
                    focused
                />
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select
                    labelId="genre-label"
                    id="genre"
                    value={genre}
                    label="Genre"
                    onChange={handleGenreChange}
                >
                    <MenuItem value="Fiction">Fiction</MenuItem>
                    <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                    <MenuItem value="Poetry">Poetry</MenuItem>
                </Select>
                <Button variant="contained" color="secondary" component="label">
                    Select File
                    <input
                        id="storyFile"
                        type="file"
                        accept=".md"
                        hidden
                        onChange={handleFileInputChange}
                    />
                </Button>

                <Button variant="contained" color="secondary" onClick={upload}>
                    Upload
                </Button>
            </Box>
        </Container>
    );
};

export default Admin;
