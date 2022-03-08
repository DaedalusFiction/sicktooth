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
import { useState } from "react";

import { FaTooth } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const pages = ["Products", "Pricing", "Blog"];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h6" component="p">
                            SICK
                        </Typography>
                        <FaTooth style={{ color: "white", margin: "0 .5em" }} />
                        <Typography variant="h6" component="p">
                            TOOTH
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <Link to="submit">
                            <Button variant="text" color="secondary">
                                Submit
                            </Button>
                        </Link>
                        <Link to="archive">
                            <Button variant="text" color="secondary">
                                Archive
                            </Button>
                        </Link>
                        <Link to="editors">
                            <Button variant="text" color="secondary">
                                Editors
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
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Box>
            </Container>
        </AppBar>
    );
};

export default Header;
