import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FetchGet from "../services/FetchGet";
import MenuItem from "@mui/material/MenuItem";

export default function BunnyName({ userid, onUpdateState, onNextClicked }) {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        const getUsers = async () => {
            const url = `/api/user/admin/listnames`;
            const result = await FetchGet(url);
            if (result.status === "success") {
                result.data.unshift({ id: "unassigned", name: "- unassigned -" });
                setUsers(result.data);
            }
        };

        getUsers();
    }, []);

    const handleUserChanged = (event) => {
        onUpdateState("userid", event.target.value);
    };

    return (
        <>
            <p>Select the user this bunny belongs to.</p>
            {users.length > 0 && userid ? (
                <TextField
                    select
                    fullWidth
                    variant="filled"
                    label="Bunny User"
                    value={userid}
                    onChange={handleUserChanged}
                >
                    {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.name}
                        </MenuItem>
                    ))}
                </TextField>
            ) : (
                <TextField fullWidth disabled variant="filled" />
            )}

            <Box
                sx={{
                    marginTop: "48px",
                }}
            >
                <Button
                    disabled={true}
                    color="primary"
                    variant="contained"
                    sx={{
                        marginRight: "8px",
                    }}
                >
                    Back
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onNextClicked}
                    sx={{
                        marginRight: "8px",
                    }}
                >
                    Next
                </Button>
            </Box>
        </>
    );
}
