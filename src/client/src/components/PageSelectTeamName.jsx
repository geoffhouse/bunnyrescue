import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FetchGet from "../services/FetchGet";
import FetchPost from "../services/FetchPost";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import ProgressButton from "./ProgressButton";
import { createTheme } from "@mui/material/styles";

export default function PageSelectTeamName({ servername, user }) {
    const theme = createTheme();
    const { enqueueSnackbar } = useSnackbar();
    const [username, setUsername] = React.useState("");
    const [isChecking, setIsChecking] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);
    const [usernameAvailable, setUsernameAvailable] = React.useState(true);

    const handleSaveClicked = async (isLogin) => {
        // we're actually already logged in - we just need to create the team name
        setIsSaving(true);

        const url = `/api/user/update/${user._id}`;
        try {
            const result = await FetchPost(url, {
                name: username,
            });
            if (!result.data) {
                throw new Error();
            }
            // all good. Let's go!
            window.location = "/";
        } catch (error) {
            enqueueSnackbar("Failed to save team name. Please try again", {
                variant: "error",
            });
            console.error(error);
        }
        setIsSaving(false);
    };

    const handleUsernameChanged = async (event) => {
        setUsername(event.target.value);
        setIsChecking(true);

        if (event.target.value !== "") {
            const url = `/api/user/isavailable/${encodeURIComponent(event.target.value)}`;
            try {
                const result = await FetchGet(url);
                if (result?.data === false) {
                    setUsernameAvailable(false);
                } else {
                    setUsernameAvailable(true);
                }
            } catch (error) {
                enqueueSnackbar("Failed to check username", {
                    variant: "error",
                });
                console.error(error);
            }
            setIsChecking(false);
        }
    };

    return (
        <Box
            sx={{
                margin: "1rem",
                paddingBottom: "2rem",
            }}
        >
            <Box sx={{ fontSize: "2rem", fontWeight: 500, textAlign: "center" }}>{servername}</Box>
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
            <Box
                sx={{
                    maxWidth: "24rem",
                    margin: "auto",
                    marginTop: "1rem",
                }}
            >
                <h3>Choose a team name</h3>
                <p>Do make it interesting, easy to remember, but avoid real names or personal details.</p>
                <form noValidate autoComplete="off">
                    <TextField
                        error={usernameAvailable ? false : true}
                        variant="filled"
                        fullWidth
                        value={username}
                        label={"Enter a name"}
                        inputProps={{ maxLength: 40 }}
                        onChange={handleUsernameChanged}
                    />
                </form>

                {usernameAvailable ? null : (
                    <Box
                        sx={{
                            marginTop: "1rem",
                        }}
                    >
                        Sorry - this username has already been taken.
                    </Box>
                )}

                <Box
                    sx={{
                        marginTop: "48px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ position: "relative" }}>
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
                        waiting={isSaving || isChecking}
                        disabled={username === "" || isSaving || isChecking || !usernameAvailable}
                        color="primary"
                        variant="contained"
                        onClick={handleSaveClicked}
                    >
                        Save Changes
                    </ProgressButton>
                </Box>
            </Box>
        </Box>
    );
}
