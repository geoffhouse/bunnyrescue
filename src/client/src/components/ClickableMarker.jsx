import React from "react";
import { useMapEvents } from "react-leaflet";
import EnhancedMarker from "react-leaflet-enhanced-marker";
import Box from "@mui/material/Box";

export default function ClickableMarker({ onChange, bunny }) {
    const [localBunny, setLocalBunny] = React.useState(bunny);

    useMapEvents({
        click(e) {
            const newBunny = e.latlng;
            setLocalBunny(newBunny);
            onChange(e.latlng);
        },
    });

    if (localBunny) {
        return (
            <EnhancedMarker
                style={{ backgroundColor: "#0000ff" }}
                position={localBunny}
                icon={
                    <Box
                        sx={{
                            backgroundColor: "#a80a10",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50px",
                            margin: "auto",
                        }}
                    ></Box>
                }
            ></EnhancedMarker>
        );
    }
    return <></>;
}
