import React from "react";
import Box from "@mui/material/Box";

export default function BunnyIcon({ found = false, owned = false, missing = false }) {
    let bunnyColor = "#40a040";
    if (missing) {
        bunnyColor = "#a80a10";
    } else if (found) {
        bunnyColor = "#888";
    } else if (owned) {
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
