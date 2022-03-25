import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

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
            <BottomNavigationAction component={Link} to="/map" label="Rescue" value="map" icon={<SearchIcon />} />
            <BottomNavigationAction
                component={Link}
                to="/leaderboard"
                label="Leaderboard"
                value="leaderboard"
                icon={<AssignmentIcon />}
            />
        </BottomNavigation>
    );
}
