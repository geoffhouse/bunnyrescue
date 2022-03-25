import React from "react";
import Box from "@mui/material/Box";

export default function BunnyIcon({ enabled = true, found = false, owned = false }) {
    let bunnyColor = "#a80a10";
    if (found) {
        bunnyColor = "#40a040";
    }
    if (owned) {
        bunnyColor = "#4040e4";
    }

    return (
        <Box
            sx={{
                backgroundColor: bunnyColor,
                width: "20px",
                height: "20px",
                borderRadius: "50px",
                margin: "auto",
            }}
        />
    );
}
