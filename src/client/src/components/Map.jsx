import React from "react";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import Marker from "react-leaflet-enhanced-marker";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import ContentWrapper from "./ContentWrapper";
import Legend from "./Legend";
import Loading from "./Loading";
import BunnyIcon from "./BunnyIcon";
import { useApiPoller } from "../services/ApiPoller";
import GeoMarkerIcon from "./GeoMarkerIcon";
import Fab from "@mui/material/Fab";
import { useRecursiveTimeout } from "../services/RecursiveTimeout";

export default function Map({ serverlocation }) {
    const map = React.useRef();
    const [geoPosition, setGeoPosition] = React.useState();

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(handleGotLocation);
    }, []);

    const handleGotLocation = (position) => {
        setGeoPosition(position);
    };

    const handleFabClicked = () => {
        const position = [geoPosition?.coords?.latitude, geoPosition?.coords?.longitude];
        map.current.flyTo(position, 16);
    };

    const bunnies = useApiPoller({
        url: `/api/bunny/list/`,
        interval: 10000,
    });

    useRecursiveTimeout(async () => {
        if (geoPosition) {
            // update position
            navigator.geolocation.getCurrentPosition((position) => handleGotLocation(position));
        }
    }, 5000);

    const renderGeoPosition = () => {
        if (geoPosition) {
            const position = [geoPosition?.coords?.latitude, geoPosition?.coords?.longitude];
            return <Marker position={position} icon={<GeoMarkerIcon />}></Marker>;
        }
        return <></>;
    };

    if (bunnies.status !== "success") {
        return <Loading sx={{ marginTop: "2rem" }} />;
    }

    return (
        <>
            <ContentWrapper>
                <MapContainer
                    whenCreated={(mapInstance) => {
                        map.current = mapInstance;
                    }}
                    style={{
                        position: "absolute",
                        top: "0",
                        bottom: "0",
                        width: "100%",
                    }}
                    center={serverlocation}
                    zoom={16}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {renderGeoPosition()}
                    {bunnies &&
                        bunnies?.data?.map((bunny) => (
                            <Marker
                                key={bunny._id}
                                position={[bunny.location.lat, bunny.location.lng]}
                                icon={<BunnyIcon {...bunny} />}
                            >
                                {bunny.helpertext && (
                                    <Popup>
                                        <span>{bunny.helpertext}</span>
                                    </Popup>
                                )}
                            </Marker>
                        ))}
                </MapContainer>

                {geoPosition && (
                    <Fab
                        size="medium"
                        color="primary"
                        aria-label="add"
                        sx={{
                            position: "fixed",
                            zIndex: 2000,
                            bottom: "88px",
                            right: "16px",
                        }}
                        onClick={handleFabClicked}
                    >
                        <MyLocationIcon />
                    </Fab>
                )}
                <Legend
                    items={[
                        { label: "Available", color: "#a80a10" },
                        { label: "Found", color: "#40a040" },
                        { label: "Owned", color: "#4040e4" },
                    ]}
                    sx={{
                        position: "fixed",
                        right: "10px",
                        marginTop: "10px",
                    }}
                />
            </ContentWrapper>
        </>
    );
}
