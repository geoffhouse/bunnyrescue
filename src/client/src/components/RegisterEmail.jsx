import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FetchGet from "../services/FetchGet";
import ProgressButton from "./ProgressButton";
import { createTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";

export default function RegisterEmail({ value, onUpdateState, onNextClicked }) {
    const theme = createTheme();
    const [email, setEmail] = React.useState(value);
    const [requestingCode, setRequestingCode] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();

    // return false;
    const requestOneTimeKey = async () => {
        setRequestingCode(true);
        const url = "/api/user/generateotk/" + encodeURIComponent(email);
        try {
            const result = await FetchGet(url);
            if (!result.data) {
                enqueueSnackbar("Email address not found or account disabled. Please contact your administrator.", {
                    variant: "error",
                });
                setRequestingCode(false);
                return;
            }
            onUpdateState({ email: email });
            onNextClicked();
        } catch (error) {
            enqueueSnackbar("Failed to generate key - please try again", {
                variant: "error",
            });
            console.error(error);
            setRequestingCode(false);
        }
    };

    const handleTextFieldChanged = (event) => {
        setEmail(event.target.value.trim());
        onUpdateState({ email: event.target.value.trim() });
    };

    return (
        <Box
            sx={{
                margin: "1rem",
                paddingBottom: "2rem",
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                }}
            >
                <Box
                    component="img"
                    src="/bunny.svg"
                    sx={{
                        [theme.breakpoints.down("sm")]: {
                            width: "10rem",
                        },
                        [theme.breakpoints.up("sm")]: {
                            width: "12rem",
                        },
                        "@media (max-width:350px)": {
                            width: "8rem",
                        },
                    }}
                />
            </Box>
            <Box sx={{ maxWidth: "24rem", margin: "auto", marginTop: "1rem" }}>
                <form noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                    <p>Please enter your registered email address</p>
                    <TextField
                        variant="filled"
                        fullWidth
                        value={email}
                        label="Enter your email"
                        inputProps={{ maxLength: 255 }}
                        onChange={handleTextFieldChanged}
                        type="email"
                    />

                    <Box
                        sx={{
                            marginTop: "48px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                            }}
                        >
                            <Button
                                disabled={true}
                                color="secondary"
                                variant="contained"
                                sx={{
                                    marginRight: "8px",
                                }}
                            >
                                Back
                            </Button>
                        </Box>
                        <ProgressButton
                            waiting={requestingCode}
                            disabled={email ? false : true}
                            color="primary"
                            variant="contained"
                            onClick={requestOneTimeKey}
                            type="submit"
                        >
                            Register
                        </ProgressButton>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}
