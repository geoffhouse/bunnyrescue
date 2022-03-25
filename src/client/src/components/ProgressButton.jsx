import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function ProgressButton({
    type = "button",
    color,
    variant,
    waiting = false,
    children,
    disabled = false,
    onClick,
}) {
    return (
        <Box sx={{ position: "relative" }}>
            <Button
                color={color}
                variant={variant}
                sx={{
                    marginRight: "8px",
                }}
                disabled={disabled || waiting}
                onClick={onClick}
                type={type}
            >
                {children}
            </Button>
            {waiting && (
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
    );
}
