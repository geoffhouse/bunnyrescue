import React from "react";
import Box from "@mui/material/Box";

export default function Legend({ items = [], sx = {} }) {
    return (
        <>
            <Box
                sx={{
                    ...sx,
                    border: "2px solid rgba(0,0,0,0.2)",
                    zIndex: 2001,
                    backgroundColor: "#ffffff",
                    opacity: 0.8,
                    borderRadius: "5px",
                    padding: "2px 4px",
                }}
            >
                {items &&
                    items.map((item, index) => (
                        <Box key={index} sx={{ display: "flex", alignItems: "center", padding: "0 2px" }}>
                            <Box
                                sx={{
                                    borderRadius: "5px",
                                    backgroundColor: item.color,
                                    width: "10px",
                                    height: "10px",
                                    padding: "2px",
                                }}
                            ></Box>
                            <Box sx={{ padding: "2px 8px" }}>{item.label}</Box>
                        </Box>
                    ))}
            </Box>
        </>
    );
}
