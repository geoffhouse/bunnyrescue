import React from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";

export default function BunnyAdoptDone({ times, onNextClicked }) {
    const history = useHistory();
    return (
        <>
            <Box
                sx={{
                    margin: "2rem",
                }}
            >
                <p>Well done!</p>
                {times.started ? (
                    <p>Your bunny has been successfully adopted and is now ready to be found.</p>
                ) : (
                    <p>
                        Your bunny has been successfully adopted and once the games starts it will be ready to be found.
                    </p>
                )}
            </Box>

            <Divider />

            <Box
                sx={{
                    marginTop: "24px",
                }}
            >
                <Button
                    disabled={true}
                    color="primary"
                    variant="contained"
                    sx={{
                        marginRight: "8px",
                    }}
                >
                    Back
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                        history.push("/scanbunny");
                    }}
                    sx={{
                        marginRight: "8px",
                    }}
                >
                    Scan Another
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onNextClicked}
                    sx={{
                        marginRight: "8px",
                    }}
                >
                    Finish
                </Button>
            </Box>
        </>
    );
}
