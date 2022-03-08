import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const ContinueReadingButton = ({ story }) => {
    return (
        <Link to={story}>
            <Button
                variant="text"
                color="secondary"
                size="small"
                endIcon={<BsArrowRight />}
                sx={{ margin: "1em 0" }}
            >
                Continue
            </Button>
        </Link>
    );
};

export default ContinueReadingButton;
