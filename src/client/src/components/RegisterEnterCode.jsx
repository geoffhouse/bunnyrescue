import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FetchGet from "../services/FetchGet";
import { createTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import ProgressButton from "./ProgressButton";
import { useCookies } from "react-cookie";

export default function RegisterEmail({ code = "", email, onUpdateState, onBackClicked, onNextClicked }) {
    const theme = createTheme();
    const [localCode, setLocalCode] = React.useState(code);
    const [checkingCode, setCheckingCode] = React.useState(false);
    const [codeError, setCodeError] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [, setCookie] = useCookies();

    const checkCode = async () => {
        setCheckingCode(true);

        const url = `/api/user/checkotk/${encodeURIComponent(email)}/${encodeURIComponent(localCode)}`;
        try {
            const result = await FetchGet(url);
            if (result.data === false) {
                setCodeError(true);
            } else {
                // set cookie
                const oneYear = 60 * 60 * 24 * 365;
                setCookie("userid", result.data.id, { path: "/", maxAge: oneYear });
                setCookie("userkey", result.data.key, { path: "/", maxAge: oneYear });
                onUpdateState({
                    id: result.data.id,
                    key: result.data.key,
                });
                onNextClicked();
            }
        } catch (error) {
            enqueueSnackbar("Failed to check code - please try again", {
                variant: "error",
            });
            console.error(error);
        }
        setCheckingCode(false);
    };

    const handleTextFieldChanged = (event) => {
        setCodeError(false);
        setLocalCode(event.target.value.trim());
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
                    <p>Please check your email and enter the six digit code:</p>
                    <TextField
                        error={localCode !== "" && codeError}
                        variant="filled"
                        fullWidth
                        value={localCode}
                        label="Enter your code"
                        inputProps={{ maxLength: 255 }}
                        onChange={handleTextFieldChanged}
                        type="number"
                    />
                    <p>Please check your spam folder, and note that it may take a few minutes to arrive...</p>

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
                                onClick={onBackClicked}
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
                            waiting={checkingCode}
                            disabled={localCode ? false : true}
                            color="primary"
                            variant="contained"
                            onClick={checkCode}
                            type="submit"
                        >
                            Check Code
                        </ProgressButton>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}
