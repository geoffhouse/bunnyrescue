import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import QrCodeIcon from "@mui/icons-material/QrCode";

export default function Navigation({ value }) {
    return (
        <BottomNavigation
            value={value}
            showLabels
            sx={{
                width: "100%",
                position: "fixed",
                bottom: 0,
                zIndex: 1010,
            }}
        >
            <BottomNavigationAction component={Link} to="/" label="Home" value="home" icon={<HomeIcon />} />
            <BottomNavigationAction component={Link} to="/scanbunny" label="Scan" value="scan" icon={<QrCodeIcon />} />
            <BottomNavigationAction component={Link} to="/map" label="Find" value="map" icon={<SearchIcon />} />
        </BottomNavigation>
    );
}
