import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Marker from "react-leaflet-enhanced-marker";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import ClickableMarker from "./ClickableMarker";

export default function MapSelect({ location, onChange, serverlocation }) {
    const map = React.useRef();
    const [value, setValue] = React.useState(location);
    const [geoPosition, setGeoPosition] = React.useState(null);

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(handleGotLocation);
    }, []);

    const handleMapChanged = (latlng) => {
        onChange(latlng);
        setValue(latlng);
    };

    const handleGotLocation = (position) => {
        if (map.current === null) {
            return;
        }
        setGeoPosition(position);
    };

    const handleFabClicked = () => {
        map.current.flyTo([geoPosition.coords.latitude, geoPosition.coords.longitude], 16);
    };

    return (
        <Box
            sx={{
                height: "15rem",
                width: "100%",
                position: "relative",
            }}
        >
            <MapContainer
                whenCreated={(mapInstance) => {
                    map.current = mapInstance;
                }}
                center={location ? location : serverlocation}
                zoom={16}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ClickableMarker bunny={value} onChange={handleMapChanged} />
                {geoPosition && (
                    <Marker
                        position={[geoPosition.coords.latitude, geoPosition.coords.longitude]}
                        icon={
                            <Box
                                sx={{
                                    backgroundColor: "#000000",
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50px",
                                    margin: "auto",
                                }}
                            ></Box>
                        }
                    ></Marker>
                )}
            </MapContainer>
            {geoPosition && (
                <Fab
                    size="medium"
                    color="primary"
                    aria-label="add"
                    sx={{
                        position: "absolute",
                        zIndex: 2000,
                        right: "10px",
                        bottom: "25px",
                    }}
                    onClick={handleFabClicked}
                >
                    <MyLocationIcon />
                </Fab>
            )}
        </Box>
    );
}
