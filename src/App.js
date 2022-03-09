import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Archive from "./routes/Archive";
import Home from "./routes/Home";
import Layout from "./routes/Layout";
import Submit from "./routes/Submit";
import Editors from "./routes/Editors";
import NoPage from "./routes/NoPage";
import { BrowserRouter } from "react-router-dom";
import Admin from "./routes/Admin";

import { CssBaseline } from "@mui/material/";
import Stories from "./routes/Stories";
import Story from "./routes/Story";

import { useEffect, useState } from "react";
import {
    collection,
    doc,
    getDoc,
    query,
    orderBy,
    limit,
    getDocs,
} from "firebase/firestore";
import { ref, getDownloadURL, getBytes } from "firebase/storage";
import { db, storage } from "./firebase";
import { marked } from "marked";

const theme = createTheme({
    palette: {
        background: {
            default: "rgb(37, 37, 37)",
        },
        text: {
            primary: "rgb(224, 213, 207)",
        },
        primary: {
            main: "rgb(37, 37, 37)",
        },
        secondary: {
            main: "rgb(224, 213, 207)",
        },
    },
});

function App() {
    const [stories, setStories] = useState(null);
    useEffect(() => {
        async function getStories() {
            const q = query(
                collection(db, "stories"),
                orderBy("createdAt", "desc"),
                limit(4)
            );

            const docsSnap = await getDocs(q);
            let newStories = [];
            docsSnap.docs.forEach((doc, index) => {
                newStories = [...newStories, doc.data()];
            });
            setStories(newStories);
        }

        getStories();
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home stories={stories} />} />
                        <Route path="submit" element={<Submit />} />
                        <Route path="archive" element={<Archive />} />
                        <Route path="editors" element={<Editors />} />
                        <Route path="admin" element={<Admin />} />
                        <Route path="stories" element={<Stories />}>
                            <Route path=":title" element={<Story />} />
                        </Route>
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
