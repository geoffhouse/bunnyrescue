import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FetchGet from "../services/FetchGet";
import FetchPost from "../services/FetchPost";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import ProgressButton from "./ProgressButton";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";

export default function PageChangeTeamName({ user }) {
    const { enqueueSnackbar } = useSnackbar();
    const [username, setUsername] = React.useState("");
    const [isChecking, setIsChecking] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);
    const [usernameAvailable, setUsernameAvailable] = React.useState(true);
    const history = useHistory();

    React.useEffect(() => {
        const getCurrentUser = async () => {
            const url = `/api/user/getcurrent`;
            const result = await FetchGet(url);
            if (result.status === "success") {
                setUsername(result.data.name);
            }
        };

        getCurrentUser();
    }, []);

    const handleSaveClicked = async (isLogin) => {
        setIsSaving(true);

        const url = `/api/user/update/${user._id}`;
        try {
            const result = await FetchPost(url, {
                name: username,
            });
            if (!result.data) {
                throw new Error();
            }
            history.push("/");
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

    if (!username) {
        return <Loading sx={{ marginTop: "2rem" }} />;
    }

    return (
        <Box
            sx={{
                margin: "1rem",
                paddingBottom: "2rem",
            }}
        >
            <Box
                sx={{
                    maxWidth: "24rem",
                    margin: "auto",
                    marginTop: "4rem",
                }}
            >
                <p>
                    Pick a new team name. <br />
                    Do make it interesting, easy to remember, but avoid real names or personal details.
                </p>
                <form noValidate autoComplete="off">
                    <TextField
                        error={usernameAvailable ? false : true}
                        disabled={user.name === "admin"}
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

                <Box sx={{ marginTop: "1rem" }}>
                    <TextField disabled={true} variant="filled" fullWidth value={user.email} label={"Email"} />
                </Box>

                <Box
                    sx={{
                        marginTop: "48px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ position: "relative" }}>
                        <Button
                            color="secondary"
                            onClick={() => {
                                history.goBack();
                            }}
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
                        disabled={
                            username === "" || isSaving || isChecking || !usernameAvailable || user.name === "admin"
                        }
                        color="primary"
                        variant="contained"
                        onClick={handleSaveClicked}
                    >
                        Save
                    </ProgressButton>
                </Box>
            </Box>
        </Box>
    );
}
