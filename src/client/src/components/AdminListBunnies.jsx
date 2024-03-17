import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Loading from "./Loading";
import TimeAgo from "timeago-react";
import { useApiPoller } from "../services/ApiPoller";
import { useHistory } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useConfirmDialog } from "./ConfirmDialog";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import FetchGet from "../services/FetchGet";
import { useForceRefresh } from "./ForceRefresh";
import ItemMenu from "./ItemMenu";
import { useTheme } from "@mui/material/styles";

export default function ListBunnies({ times }) {
    const history = useHistory();
    const { confirmDialog } = useConfirmDialog();
    const [forceRefresh, doForceRefresh] = useForceRefresh();
    const theme = useTheme();

    const bunnies = useApiPoller({
        url: `/api/bunny/admin/list/`,
        interval: 10000,
        forceRefresh: forceRefresh,
    });

    const handleRowClicked = (bunnyId) => {
        history.push(`/admin/bunny/${encodeURIComponent(bunnyId)}`);
    };

    const handleDeleteClicked = async (bunny) => {
        const result = await confirmDialog({
            title: "Delete bunny?",
            message: ["This will permenantly delete this bunny.", "Are you sure?"],
            confirmButtonText: "Delete",
        });
        if (result !== false) {
            const url = `/api/bunny/admin/delete/${encodeURIComponent(bunny._id)}`;
            await FetchGet(url);
            doForceRefresh();
        }
    };

    const handleEditClicked = async (bunny) => {
        history.push(`/admin/bunny/${encodeURIComponent(bunny._id)}`);
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

    if (bunnies.data.length === 0) {
        return (
            <>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">No bunnies found</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </>
        );
    }

    return (
        <>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell
                                sx={{
                                    "@media (max-width:250px)": {
                                        display: "none",
                                    },
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Last Found
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bunnies.data.map((bunny) => (
                            <TableRow
                                hover
                                sx={{
                                    td: {
                                        opacity: bunny.enabled ? 1 : "0.3",
                                    },
                                    cursor: "pointer",
                                }}
                                key={bunny._id}
                                onClick={() => handleRowClicked(bunny._id)}
                            >
                                <TableCell>
                                    {bunny.name}
                                    {bunny.missing && (
                                        <Box
                                            sx={{
                                                whiteSpace: "nowrap",
                                                fontWeight: 900,
                                                color: theme.palette.primary.main,
                                            }}
                                        >
                                            (marked missing)
                                        </Box>
                                    )}
                                </TableCell>
                                <TableCell>{bunny.user}</TableCell>
                                <TableCell
                                    sx={{
                                        "@media (max-width:250px)": {
                                            display: "none",
                                        },
                                    }}
                                    width="30"
                                >
                                    {bunny.lastfound ? (
                                        <Box sx={{ whiteSpace: "nowrap" }}>
                                            <TimeAgo datetime={bunny.lastfound} />
                                        </Box>
                                    ) : (
                                        "Never"
                                    )}
                                </TableCell>
                                <TableCell sx={{ width: "1rem", opacity: "1 !important" }}>
                                    <ItemMenu
                                        item={bunny}
                                        menuItems={[
                                            {
                                                title: "Edit",
                                                icon: <EditIcon fontSize="small" />,
                                                onClick: (event, item) => handleEditClicked(item),
                                            },
                                            {
                                                title: "Delete",
                                                icon: <DeleteIcon fontSize="small" />,
                                                onClick: (event, item) => handleDeleteClicked(item),
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
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
