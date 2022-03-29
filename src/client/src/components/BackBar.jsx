import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import { createTheme } from "@mui/material/styles";

export default function BackBar({ title, position = "fixed", menu }) {
    const theme = createTheme();
    const history = useHistory();

    const handleBackClicked = () => {
        history.goBack();
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                zIndex: "1010",
                position: "sticky",
                [theme.breakpoints.down("sm")]: {
                    height: "56px",
                },
                [theme.breakpoints.up("sm")]: {
                    height: "64px",
                },
            }}
        >
            <AppBar
                position={position}
                sx={{
                    backgroundColor: "#f3f3f3",
                    color: "#000000",
                    borderBottom: "1px solid #ccc",
                    boxShadow: "none",
                }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        sx={{
                            marginRight: "16px",
                        }}
                        color="inherit"
                        aria-label="menu"
                        onClick={handleBackClicked}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {title}
                    </Typography>
                    {menu}
                    {/* <Menu /> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
