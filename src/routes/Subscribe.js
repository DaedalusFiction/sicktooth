import { Container, Box, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Subscribe = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    const subscribe = async () => {
        if (!error) {
            const fileRef = doc(db, "mailinglist", email);
            const uploadTask = await setDoc(fileRef, { email: email });
            setSubscribed(true);
            setErrorMessage(false);
            setEmail("");
        } else {
            setErrorMessage(true);
        }
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
    return (
        <Container>
            <Typography variant="h2">
                {" "}
                Subscribe to our Mailing List!
            </Typography>
            <Typography style={{ maxWidth: "65ch" }}>
                Your privacy is extremely important ot us. We promise never to
                sell your information to anyone, ever.
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                    marginTop: "2em",
                    alignItems: "start",
                }}
            >
                <TextField
                    id="subscribe"
                    label="Email"
                    color="secondary"
                    value={email}
                    onChange={handleEmailChange}
                    error={error}
                    focused
                    variant="outlined"
                    sx={{ width: "min(90vw, 25em)" }}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={subscribe}
                    sx={{ marginBottom: "1em" }}
                >
                    Subscribe
                </Button>
            </Box>
            {errorMessage && (
                <Typography>Please enter a valid email address</Typography>
            )}
            {subscribed && <Typography>Thank you for subscribing!</Typography>}
        </Container>
    );
};

export default Subscribe;
