import React from "react";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";

export default function ContentWrapper({ children, scrollable = false, sx = {} }) {
    const theme = createTheme();
    return (
        <Box
            sx={{
                ...sx,
                top: 0,
                [theme.breakpoints.down("sm")]: {
                    top: "56px",
                },
                [theme.breakpoints.up("sm")]: {
                    top: "64px",
                },
                overflow: scrollable ? "scroll" : "visible:",
                position: "absolute",
                bottom: "56px",
                left: 0,
                right: 0,
            }}
        >
            {children}
        </Box>
    );
}
