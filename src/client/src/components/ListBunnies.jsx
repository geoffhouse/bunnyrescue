import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loading from "./Loading";
import TimeAgo from "timeago-react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useApiPoller } from "../services/ApiPoller";
import { useHistory } from "react-router-dom";

export default function ListBunnies({ times }) {
    const history = useHistory();

    const bunnies = useApiPoller({
        url: `/api/bunny/ownedlist/`,
        interval: 10000,
    });

    const handleRowClicked = (bunnyId) => {
        history.push(`/bunny/${encodeURIComponent(bunnyId)}`);
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
                                <TableCell align="center">You have no bunnies registered</TableCell>
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
                            <TableCell
                                sx={{
                                    "@media (max-width:250px)": {
                                        display: "none",
                                    },
                                }}
                            >
                                Found
                            </TableCell>
                            <TableCell
                                sx={{
                                    "@media (max-width:350px)": {
                                        display: "none",
                                    },
                                }}
                            >
                                Created
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bunnies.data.map((bunny) => (
                            <TableRow
                                hover
                                sx={{
                                    opacity: bunny.enabled ? 1 : "0.3",
                                    cursor: "pointer",
                                }}
                                key={bunny._id}
                                onClick={() => handleRowClicked(bunny._id)}
                            >
                                <TableCell>{bunny.name}</TableCell>
                                <TableCell
                                    sx={{
                                        "@media (max-width:250px)": {
                                            display: "none",
                                        },
                                    }}
                                    width="30"
                                >
                                    {bunny.finds}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        "@media (max-width:350px)": {
                                            display: "none",
                                        },
                                    }}
                                >
                                    <TimeAgo datetime={bunny.created} />
                                </TableCell>
                                <TableCell sx={{ width: "1rem" }}>
                                    <ChevronRightIcon style={{ opacity: 0.5 }} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
