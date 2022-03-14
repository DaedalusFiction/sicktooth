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
import React, { useEffect, useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db, auth, provider } from "../firebase";
const moment = require("moment");

const Admin = () => {
    const [file, setFile] = useState(null);
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState(null);
    const [bio, setBio] = useState("");

    const [currentUser, setCurrentUser] = useState(null);

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setCurrentUser(user);
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    const testbutton = () => {
        console.log(currentUser.email);
    };

    const upload = async () => {
        if (date && file && genre !== "") {
            const author = document.getElementById("author").value;
            const title = document.getElementById("title").value;

            const storageRef = ref(storage, `stories/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (error) => {
                    console.log(error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            const docRef = doc(collection(db, "stories"));
                            setDoc(docRef, {
                                id: docRef.id,
                                author: author,
                                title: title,
                                genre: genre,
                                createdAt: Date.now(),
                                date: date,
                                url: downloadURL,
                                bio: bio,
                            });
                        }
                    );
                    console.log("success");
                    setFile(null);
                    setGenre("");
                    setDate(null);
                }
            );
        } else {
            console.log("one or more fields blank");
        }
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    const handleFileInputChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    return (
        <Container maxWidth="sm">
            <Button onClick={signIn} color="secondary">
                Sign In
            </Button>
            <Button onClick={testbutton} color="secondary">
                test
            </Button>
            <Paper color="seconary" sx={{ padding: "1em" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em",
                    }}
                >
                    <TextField id="title" label="Title" variant="outlined" />
                    <TextField id="author" label="Author" variant="outlined" />
                    <TextField
                        id="bio"
                        label="Bio"
                        multiline
                        value={bio}
                        onChange={handleBioChange}
                        minRows={4}
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
