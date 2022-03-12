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
import About from "./routes/About";

const theme = createTheme({
    palette: {
        background: {
            default: "rgb(37, 37, 37)",
        },
        text: {
            primary: "rgb(224, 213, 207)",
        },
        primary: {
            //dark brown
            main: "rgb(37, 37, 37)",
        },
        secondary: {
            //cream
            main: "rgb(224, 213, 207)",
        },
        tertiary: {
            //burgundy
            main: "rgb(153, 0, 51)",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="submit" element={<Submit />} />
                        <Route path="about" element={<About />} />
                        <Route path="archive" element={<Archive />} />
                        <Route path="editors" element={<Editors />} />
                        <Route path="admin" element={<Admin />} />
                        <Route path="stories" element={<Stories />}>
                            <Route path=":id" element={<Story />} />
                        </Route>
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
