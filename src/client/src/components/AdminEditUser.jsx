import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TimeAgo from "timeago-react";
import FetchGet from "../services/FetchGet";

const StyledP = styled("p")(() => ({
    marginTop: "32px",
    color: "#606060",
}));

export default function EditUser({ isSaving = false, user, onSave }) {
    const [emails, setEmails] = React.useState([]);
    const [emailTaken, setEmailTaken] = React.useState(false);
    const [localUser, setLocalUser] = React.useState(user);

    React.useEffect(() => {
        // check if email address is taken
        const checkEmail = emails.filter((email) => email.email === localUser.email && email.id !== localUser._id);
        setEmailTaken(checkEmail.length > 0);
    }, [emails, localUser]);

    React.useEffect(() => {
        const fetchEmails = async () => {
            const url = `/api/user/admin/listemail`;
            try {
                const result = await FetchGet(url);
                if (result && result.status === "success") {
                    setEmails(result.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchEmails();
    }, []);

    return (
        <>
            <form noValidate autoComplete="off">
                <StyledP sx={{ marginTop: "12px" }}>The team/user name</StyledP>
                <TextField
                    fullWidth
                    disabled={localUser.name === "admin"}
                    variant="filled"
                    value={localUser.name}
                    onChange={(event) => setLocalUser({ ...localUser, name: event.target.value })}
                    label="User name"
                    inputProps={{ maxLength: 40 }}
                />

                <StyledP>Email address used to register</StyledP>
                <TextField
                    fullWidth
                    disabled={localUser.name === "admin"}
                    variant="filled"
                    value={localUser.email}
                    error={emailTaken}
                    onChange={(event) => setLocalUser({ ...localUser, email: event.target.value })}
                    label="Email address"
                    inputProps={{ maxLength: 255 }}
                    helperText={emailTaken ? "Email address already in use" : ""}
                    type="email"
                />

                <StyledP sx={{ marginBottom: "4px" }}>
                    Disabling the user prevents them from logging in or registering finds
                </StyledP>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch
                                disabled={localUser.name === "admin"}
                                checked={localUser.enabled}
                                onChange={(event) => setLocalUser({ ...localUser, enabled: event.target.checked })}
                                color="primary"
                            />
                        }
                        label="Account Enabled"
                    />
                </FormGroup>

                <StyledP>User Created</StyledP>
                <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.06)", padding: "16px 14px" }}>
                    <TimeAgo datetime={user.created} />
                </Box>

                <StyledP>Last Visited</StyledP>
                <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.06)", padding: "16px 14px" }}>
                    <TimeAgo datetime={user.lastvisited} />
                </Box>

                <StyledP>Last Find</StyledP>
                <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.06)", padding: "16px 14px" }}>
                    {user.lastfound !== null ? <TimeAgo datetime={user.lastfound} /> : <>Never</>}
                </Box>

                <StyledP sx={{ marginBottom: "4px" }}>
                    Making the user an admin gives them full access to all data on this server. Use with caution!
                </StyledP>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch
                                disabled={localUser.name === "admin"}
                                checked={localUser.isAdmin}
                                onChange={(event) => setLocalUser({ ...localUser, isAdmin: event.target.checked })}
                                color="primary"
                            />
                        }
                        label="Admin"
                    />
                </FormGroup>
            </form>

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
                        color="primary"
                        variant="contained"
                        sx={{
                            marginRight: "8px",
                        }}
                    >
                        Back
                    </Button>
                </Box>
                <Box
                    sx={{
                        position: "relative",
                    }}
                >
                    <Button
                        disabled={isSaving || localUser.name === "" || emailTaken}
                        color="primary"
                        variant="contained"
                        onClick={() => onSave(localUser)}
                        sx={{
                            marginRight: "8px",
                        }}
                    >
                        Save
                    </Button>
                    {isSaving && (
                        <CircularProgress
                            size={24}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                marginTop: "-12px",
                                marginLeft: "-12px",
                            }}
                        />
                    )}
                </Box>
            </Box>
        </>
    );
}
