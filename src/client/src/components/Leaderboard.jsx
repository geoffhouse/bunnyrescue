import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loading from "./Loading";
import TimeAgo from "timeago-react";
import { useApiPoller } from "../services/ApiPoller";

export default function Leaderboard() {
    const users = useApiPoller({
        url: `/api/user/list/`,
        interval: 10000,
    });

    if (users.status !== "success") {
        return <Loading sx={{ marginTop: "2rem" }} />;
    }

    if (users.data.length === 0) {
        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">There are no users registered on this system</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        );
    }
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell>User Name</TableCell>
                        <TableCell>Last Visited</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.data.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell width="30">{user.totalfound}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>
                                <TimeAgo datetime={user.lastvisited} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
