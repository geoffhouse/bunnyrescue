import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MapSelect from "./MapSelect";

export default function BunnyLocation({
    value,
    onUpdateState,
    serverlocation,
    isCreating,
    onNextClicked,
    onBackClicked,
}) {
    const [localValue, setLocalValue] = React.useState(value);

    const handleMapChanged = (latlng) => {
        onUpdateState("location", latlng);
        setLocalValue(latlng);
    };

    return (
        <>
            <p>
                Now you need to put a pin on the map to show roughly where the printed code will be displayed in real
                life.
            </p>
            <p>On a tree, stapled to your fence, on a lamp post. Make it as easy or as cunning as you like.</p>

            <MapSelect
                geolocate={true}
                serverlocation={serverlocation}
                onChange={handleMapChanged}
                location={localValue}
            />
            <Box
                sx={{
                    marginTop: "48px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Box sx={{ position: "relative" }}>
                    <Button
                        disabled={isCreating}
                        color="secondary"
                        variant="contained"
                        sx={{
                            marginRight: "8px",
                        }}
                        onClick={onBackClicked}
                    >
                        Back
                    </Button>
                </Box>
                <Box sx={{ position: "relative" }}>
                    <Button
                        disabled={localValue === null || isCreating}
                        color="primary"
                        variant="contained"
                        onClick={onNextClicked}
                        sx={{
                            marginRight: "8px",
                        }}
                    >
                        Create
                    </Button>
                    {isCreating && (
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
