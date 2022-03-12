import { useState, Fragment } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";

export default function Notification({ message, open, setOpen }) {
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const action = (
        <Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon color="secondary" fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={<Typography color="secondary"> {message}</Typography>}
                action={action}
                sx={{
                    "& .MuiSnackbarContent-root": {
                        backgroundColor: "rgb(153, 0, 51)",
                    },
                }}
            />
        </div>
    );
}
