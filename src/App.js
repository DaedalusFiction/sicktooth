import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Archive from "./routes/Archive";
import Home from "./routes/Home";
import Layout from "./routes/Layout";
import Submit from "./routes/Submit";
import Editors from "./routes/Editors";
import NoPage from "./routes/NoPage";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL, getBytes } from "firebase/storage";
import { db, storage } from "./firebase";
import { marked } from "marked";

const matter = require("gray-matter");

const theme = createTheme({
    palette: {
        primary: {
            main: "rgb(37, 37, 37)",
        },
        secondary: {
            main: "rgb(224, 213, 207)",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="submit" element={<Submit />} />
                        <Route path="archive" element={<Archive />} />
                        <Route path="editors" element={<Editors />} />
                        <Route path="nopage" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
