import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PinDropIcon from "@mui/icons-material/PinDrop";
import LockIcon from "@mui/icons-material/Lock";
import HelpIcon from "@mui/icons-material/Help";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GradeIcon from "@mui/icons-material/Grade";
import { useCookies } from "react-cookie";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export default function Menu({ open = false, onClose, times }) {
    const [, removeCookie] = useCookies();

    const Logout = function () {
        removeCookie("userid");
        removeCookie("userkey");
        window.location = "/";
    };

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <List sx={{ width: 250 }}>
                <ListItem button component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/map">
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rescue a Bunny" />
                </ListItem>
                <ListItem button component={Link} to="/bunnies">
                    <ListItemIcon>
                        <PinDropIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Bunnies" />
                </ListItem>
                <ListItem button component={Link} to="/prizes">
                    <ListItemIcon>
                        <GradeIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Prizes" />
                </ListItem>
                <ListItem button component={Link} to="/leaderboard">
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Leaderboard" />
                </ListItem>
                <ListItem button component={Link} to="/privacy">
                    <ListItemIcon>
                        <LockIcon />
                    </ListItemIcon>
                    <ListItemText primary="Privacy" />
                </ListItem>
                <ListItem button component={Link} to="/faq">
                    <ListItemIcon>
                        <HelpIcon />
                    </ListItemIcon>
                    <ListItemText primary="Help / Questions" />
                </ListItem>
                <ListItem button component={Link} to="/teamname">
                    <ListItemIcon>
                        <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Change Name" />
                </ListItem>
                <ListItem button onClick={Logout}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Drawer>
    );
}
