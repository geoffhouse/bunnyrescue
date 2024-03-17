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
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TimeAgo from "timeago-react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemMenu from "./ItemMenu";
import { useHistory } from "react-router-dom";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import SearchIcon from "@mui/icons-material/Search";
import FetchGet from "../services/FetchGet";
import { useForceRefresh } from "./ForceRefresh";
import { useConfirmDialog } from "./ConfirmDialog";
import { useTheme } from "@mui/material/styles";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function Map({ serverlocation, user }) {
    const map = React.useRef();
    const [geoPosition, setGeoPosition] = React.useState();
    const history = useHistory();
    const [forceRefresh, doForceRefresh] = useForceRefresh();
    const { confirmDialog } = useConfirmDialog();
    const theme = useTheme();

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
        forceRefresh: forceRefresh,
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

    const handleEditClicked = (bunny) => {
        history.push(`/bunny/${bunny._id}`);
    };

    const handleAdminEditClicked = (bunny) => {
        history.push(`/admin/bunny/${bunny._id}`);
    };

    const handleAdminDeleteClicked = async (bunny) => {
        const result = await confirmDialog({
            title: "Delete bunny?",
            message: [
                "This will permenantly delete this bunny and should only be done in exceptional circumstances.",
                "Are you sure?",
            ],
            confirmButtonText: "Delete",
        });
        if (result !== false) {
            const url = `/api/bunny/admin/delete/${encodeURIComponent(bunny._id)}`;
            await FetchGet(url);
            doForceRefresh();
        }
    };

    const handleSetMissingClicked = async (bunny) => {
        const result = await confirmDialog({
            title: "Mark as missing",
            message: ["This will flag the bunny as missing for everyone.", "Are you really sure it's gone?"],
            confirmButtonText: "Mark",
        });
        if (result !== false) {
            const url = `/api/bunny/setmissing/${encodeURIComponent(bunny._id)}`;
            await FetchGet(url);
            doForceRefresh();
        }
    };

    const handleAdminSetAvailableClicked = async (bunny) => {
        const result = await confirmDialog({
            title: "Mark as found",
            message: [
                "Usually it's best to scan the bunny - which will automatically mark it as available. Are you really sure?",
            ],
            confirmButtonText: "Mark",
        });
        if (result !== false) {
            const url = `/api/bunny/admin/setavailable/${encodeURIComponent(bunny._id)}`;
            await FetchGet(url);
            doForceRefresh();
        }
    };

    const handleDisableClicked = async (bunny) => {
        const url = `/api/bunny/admin/disable/${encodeURIComponent(bunny._id)}`;
        await FetchGet(url);
        doForceRefresh();
    };

    const handleEnableClicked = async (bunny) => {
        const url = `/api/bunny/admin/enable/${encodeURIComponent(bunny._id)}`;
        await FetchGet(url);
        doForceRefresh();
    };

    if (bunnies.status !== "success") {
        return <Loading sx={{ marginTop: "2rem" }} />;
    }

    return (
        <Box
            sx={{
                "& .leaflet-popup-content": {
                    marginRight: user.isAdmin ? "0px" : "14px",
                    marginLeft: "14px",
                    minWidth: "220px",
                },
                "& .leaflet-container a.leaflet-popup-close-button": {
                    fontSize: "26px",
                    right: "10px",
                    top: "8px",
                },
            }}
        >
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
                        bunnies?.data?.map((bunny) => {
                            return (
                                <Marker
                                    key={bunny._id}
                                    position={[bunny.location.lat, bunny.location.lng]}
                                    icon={<BunnyIcon {...bunny} />}
                                >
                                    <Popup>
                                        <Box sx={{ paddingBottom: "8px", fontWeight: 900, fontSize: "16px" }}>
                                            {bunny.name}
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Box>
                                                {bunny.missing && (
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            paddingBottom: "8px",
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                                        <SearchIcon sx={{ marginRight: "8px", opacity: 0.8 }} />
                                                        <Box
                                                            sx={{
                                                                whiteSpace: "nowrap",
                                                                color: theme.palette.primary.main,
                                                                fontSize: "14px",
                                                            }}
                                                        >
                                                            marked as missing
                                                        </Box>
                                                    </Box>
                                                )}
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        paddingBottom: "8px",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    <PeopleIcon sx={{ marginRight: "8px", opacity: 0.8 }} />
                                                    {bunny.owner}
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        fontSize: "14px",
                                                        paddingBottom: "8px",
                                                    }}
                                                >
                                                    <AccessTimeIcon sx={{ marginRight: "8px", opacity: 0.8 }} />
                                                    {bunny.lastfound ? (
                                                        <>
                                                            Found &nbsp;
                                                            <TimeAgo datetime={bunny.lastfound} />
                                                        </>
                                                    ) : (
                                                        "Not yet found"
                                                    )}
                                                </Box>
                                            </Box>
                                            {user.isAdmin && (
                                                <Box>
                                                    <ItemMenu
                                                        item={bunny}
                                                        menuItems={[
                                                            user.isAdmin && {
                                                                title: "Edit",
                                                                icon: <EditIcon fontSize="small" />,
                                                                onClick: (event, item) => handleAdminEditClicked(item),
                                                            },
                                                            {
                                                                title: "Delete",
                                                                icon: <DeleteIcon fontSize="small" />,
                                                                onClick: (event, item) =>
                                                                    handleAdminDeleteClicked(item),
                                                            },
                                                            {
                                                                title: "-",
                                                            },
                                                            {
                                                                title: "Mark Missing",
                                                                disabled: (bunny) => bunny.missing,
                                                                icon: <ToggleOnIcon fontSize="small" />,
                                                                onClick: (event, item) => handleSetMissingClicked(item),
                                                            },
                                                            {
                                                                title: "Mark Available",
                                                                disabled: (bunny) => !bunny.missing,
                                                                icon: <ToggleOffIcon fontSize="small" />,
                                                                onClick: (event, item) =>
                                                                    handleAdminSetAvailableClicked(item),
                                                            },
                                                            {
                                                                title: "-",
                                                            },
                                                            {
                                                                title: "Enable",
                                                                disabled: (bunny) => bunny.enabled,
                                                                icon: <ToggleOnIcon fontSize="small" />,
                                                                onClick: (event, item) => handleEnableClicked(item),
                                                            },
                                                            {
                                                                title: "Disable",
                                                                disabled: (bunny) => !bunny.enabled,
                                                                icon: <ToggleOffIcon fontSize="small" />,
                                                                onClick: (event, item) => handleDisableClicked(item),
                                                            },
                                                        ]}
                                                    />
                                                </Box>
                                            )}
                                        </Box>
                                        {!user.isAdmin && (
                                            <Box>
                                                {bunny.owned && (
                                                    <Button
                                                        sx={{ marginTop: "8px", marginRight: "8px" }}
                                                        startIcon={<EditIcon />}
                                                        color="secondary"
                                                        variant="contained"
                                                        onClick={() => handleEditClicked(bunny)}
                                                    >
                                                        Edit
                                                    </Button>
                                                )}
                                                <Button
                                                    disabled={bunny.missing}
                                                    sx={{ marginTop: "8px", marginRight: "8px" }}
                                                    startIcon={<SearchIcon />}
                                                    color="secondary"
                                                    variant="contained"
                                                    onClick={() => handleSetMissingClicked(bunny)}
                                                >
                                                    Mark Missing
                                                </Button>
                                            </Box>
                                        )}
                                    </Popup>
                                </Marker>
                            );
                        })}
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
                        { label: "Available", color: "#40a040" },
                        { label: "Missing", color: "#a80a10" },
                        { label: "Found", color: "#888" },
                        { label: "Owned", color: "#4040e4" },
                    ]}
                    sx={{
                        position: "fixed",
                        right: "10px",
                        marginTop: "10px",
                    }}
                />
            </ContentWrapper>
        </Box>
    );
}
