import {
    AppBar,
    Typography,
    Menu,
    MenuItem,
    IconButton,
    Container,
    Button,
} from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTooth } from "react-icons/fa";

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [currentPage, setCurrentPage] = useState("home");
    const location = useLocation();
    useEffect(() => {}, []);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar
            color="primary"
            position="static"
            elevation={0}
            sx={{
                marginBottom: "3em",
            }}
        >
            <Container sx={{ borderBottom: "1px solid " }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: ".5em 0",
                    }}
                >
                    <Link to="/">
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h6" component="p">
                                SICK
                            </Typography>
                            <FaTooth
                                style={{ color: "white", margin: "0 .5em" }}
                            />
                            <Typography variant="h6" component="p">
                                TOOTH
                            </Typography>
                        </Box>
                    </Link>
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <Link to="about">
                            <Button
                                variant="text"
                                color={
                                    location.pathname === "/about"
                                        ? "tertiary"
                                        : "secondary"
                                }
                            >
                                About
                            </Button>
                        </Link>
                        <Link to="submit">
                            <Button
                                variant="text"
                                color={
                                    location.pathname === "/submit"
                                        ? "tertiary"
                                        : "secondary"
                                }
                            >
                                Submit
                            </Button>
                        </Link>
                        <Link to="archive">
                            <Button
                                variant="text"
                                color={
                                    location.pathname === "/archive"
                                        ? "tertiary"
                                        : "secondary"
                                }
                            >
                                Archive
                            </Button>
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                            justifyContent: "flex-end",
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            <Link to="/">
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography
                                        textAlign="center"
                                        color="primary"
                                    >
                                        Home
                                    </Typography>
                                </MenuItem>
                            </Link>
                            <Link to="/about">
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography
                                        textAlign="center"
                                        color="primary"
                                    >
                                        About
                                    </Typography>
                                </MenuItem>
                            </Link>
                            <Link to="/archive">
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography
                                        textAlign="center"
                                        color="primary"
                                    >
                                        Archive
                                    </Typography>
                                </MenuItem>
                            </Link>
                            <Link to="/submit">
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography
                                        textAlign="center"
                                        color="primary"
                                    >
                                        Submit
                                    </Typography>
                                </MenuItem>
                            </Link>
                        </Menu>
                    </Box>
                </Box>
            </Container>
        </AppBar>
    );
};

export default Header;
