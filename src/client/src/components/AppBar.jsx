import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "./Menu";
import { createTheme } from "@mui/material/styles";

export default function ButtonAppBar({ position = "fixed", times, servername }) {
    const theme = createTheme();
    const [state, setState] = React.useState({
        menuVisible: false,
    });

    const toggleMenu = () => {
        setState({ ...state, menuVisible: !state.menuVisible });
    };

    const handleClose = () => {
        setState({ ...state, menuVisible: false });
    };

    return (
        <>
            <Menu open={state.menuVisible} onClose={handleClose} times={times}></Menu>
            <Box
                sx={{
                    flexGrow: 1,
                    zIndex: "1010",
                    position: "sticky",
                }}
            >
                <AppBar
                    position={position}
                    sx={{
                        backgroundColor: "#a80a10",
                    }}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            sx={{
                                [theme.breakpoints.down("xs")]: {
                                    marginRight: "0px",
                                },
                                marginRight: "16px",
                            }}
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                flexGrow: 1,
                            }}
                        >
                            {servername}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
