import React from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function PageSwitchUser({ user, servername }) {
    const params = useParams();
    const theme = createTheme();
    const history = useHistory();
    const [, removeCookie] = useCookies();

    const goHome = () => {
        history.push(`/`);
    };

    const logout = () => {
        removeCookie("userid");
        removeCookie("userkey");
        window.location = `/${params.email}`;
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
            <Box sx={{ maxWidth: "24rem", margin: "auto", marginTop: "1rem", textAlign: "center" }}>
                <form noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                    {params.email === user.email ? (
                        <>
                            <p>You are already logged in with this email address.</p>

                            <Button
                                color="secondary"
                                variant="contained"
                                sx={{
                                    marginTop: "8px",
                                }}
                                onClick={goHome}
                            >
                                Home
                            </Button>
                        </>
                    ) : (
                        <>
                            <p>You are already logged in with a different account.</p>
                            <p>Would you like to logout and register with the new address?</p>

                            <Box sx={{ margin: "24px" }}>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    sx={{
                                        marginRight: "8px",
                                    }}
                                    onClick={goHome}
                                >
                                    Cancel
                                </Button>
                                <Button color="primary" variant="contained" onClick={logout}>
                                    Logout
                                </Button>
                            </Box>
                        </>
                    )}
                </form>
            </Box>
        </Box>
    );
}
