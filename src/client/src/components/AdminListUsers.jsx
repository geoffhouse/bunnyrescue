import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loading from "./Loading";
import TimeAgo from "timeago-react";
import { Link } from "react-router-dom";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { useApiPoller } from "../services/ApiPoller";
import { useHistory } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import FetchGet from "../services/FetchGet";
import { useForceRefresh } from "./ForceRefresh";
import ItemMenu from "./ItemMenu";

export default function ListBunnies({ times }) {
    const history = useHistory();
    const [forceRefresh, doForceRefresh] = useForceRefresh();

    const users = useApiPoller({
        url: `/api/user/admin/list/`,
        interval: 10000,
        forceRefresh: forceRefresh,
    });

    const handleRowClicked = (userId) => {
        history.push(`/admin/user/${encodeURIComponent(userId)}`);
    };

    const handleEditClicked = async (user) => {
        history.push(`/admin/user/${encodeURIComponent(user._id)}`);
    };

    const handleDisableClicked = async (user) => {
        const url = `/api/user/admin/disable/${encodeURIComponent(user._id)}`;
        await FetchGet(url);
        doForceRefresh();
    };

    const handleEnableClicked = async (user) => {
        const url = `/api/user/admin/enable/${encodeURIComponent(user._id)}`;
        await FetchGet(url);
        doForceRefresh();
    };

    if (users.status !== "success") {
        return <Loading sx={{ marginTop: "2rem" }} />;
    }

    if (users.data.length === 0) {
        return <>No users found</>;
    }
    return (
        <>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell
                                sx={{
                                    "@media (max-width:250px)": {
                                        display: "none",
                                    },
                                }}
                            >
                                Logged in
                            </TableCell>
                            <TableCell
                                sx={{
                                    width: "1rem",
                                    "@media (max-width:350px)": {
                                        display: "none",
                                    },
                                }}
                            >
                                Found
                            </TableCell>
                            <TableCell
                                sx={{
                                    width: "1rem",
                                    "@media (max-width:350px)": {
                                        display: "none",
                                    },
                                }}
                            >
                                Hidden
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.data.map((user) => (
                            <TableRow
                                hover
                                sx={{
                                    td: {
                                        opacity: user.enabled ? 1 : "0.3",
                                    },
                                    cursor: "pointer",
                                }}
                                key={user._id}
                                onClick={() => handleRowClicked(user._id)}
                            >
                                <TableCell>
                                    <Box>{user.name}</Box>
                                    {user.isAdmin && (
                                        <Box
                                            sx={{
                                                fontWeight: 600,
                                                display: "inline-block",
                                                padding: "1px 5px",
                                                margin: "2px 0px",
                                                color: "white",
                                                backgroundColor: "primary.main",
                                            }}
                                        >
                                            ADMIN
                                        </Box>
                                    )}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        "@media (max-width:250px)": {
                                            display: "none",
                                        },
                                    }}
                                >
                                    {user.lastvisited ? <TimeAgo datetime={user.lastvisited} /> : "Never"}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        "@media (max-width:350px)": {
                                            display: "none",
                                        },
                                    }}
                                >
                                    {user.totalfound}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        "@media (max-width:350px)": {
                                            display: "none",
                                        },
                                    }}
                                >
                                    {user.totalhidden}
                                </TableCell>
                                <TableCell sx={{ width: "1rem", opacity: "1 !important" }}>
                                    <ItemMenu
                                        item={user}
                                        menuItems={[
                                            {
                                                title: "Edit",
                                                icon: <EditIcon fontSize="small" />,
                                                onClick: (event, item) => handleEditClicked(item),
                                            },
                                            {
                                                title: "-",
                                            },
                                            {
                                                title: "Enable",
                                                disabled: (user) => user.enabled,
                                                icon: <ToggleOnIcon fontSize="small" />,
                                                onClick: (event, item) => handleEnableClicked(item),
                                            },
                                            {
                                                title: "Disable",
                                                disabled: (user) => !user.enabled,
                                                icon: <ToggleOffIcon fontSize="small" />,
                                                onClick: (event, item) => handleDisableClicked(item),
                                            },
                                        ]}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {times.ended ? null : (
                <Link to="/admin/adduser">
                    <Fab
                        size="medium"
                        color="primary"
                        aria-label="add"
                        sx={{
                            position: "fixed",
                            bottom: "64px",
                            right: "16px",
                        }}
                    >
                        <AddIcon />
                    </Fab>
                </Link>
            )}
        </>
    );
}
