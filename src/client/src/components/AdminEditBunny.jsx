import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MapSelect from "./MapSelect";
import ColourPicker from "./ColourPicker";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FetchGet from "../services/FetchGet";

const StyledP = styled("p")(() => ({
    marginTop: "32px",
    color: "#606060",
}));

export default function AdminEditBunny({ isSaving = false, bunny, onSave, colour }) {
    const [localBunny, setLocalBunny] = React.useState(bunny);
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
        setLocalBunny({ ...localBunny, userid: event.target.value });
    };

    const handleTextboxChanged = (event) => {
        setLocalBunny({ ...localBunny, name: event.target.value });
    };

    const handleSwitchChanged = (event) => {
        setLocalBunny({ ...localBunny, enabled: event.target.checked });
    };

    const handleMapChanged = (latlng) => {
        setLocalBunny({ ...localBunny, location: latlng });
    };

    const handleColourPickerChanged = (colour) => {
        setLocalBunny({ ...localBunny, colour: colour });
    };

    const handleMessageChanged = (event) => {
        setLocalBunny({ ...localBunny, message: event.target.value });
    };

    return (
        <>
            <form noValidate autoComplete="off">
                <StyledP sx={{ marginTop: "12px" }}>The name of the bunny:</StyledP>
                <TextField
                    fullWidth
                    variant="filled"
                    value={localBunny.name}
                    onChange={handleTextboxChanged}
                    label="Bunny name"
                    inputProps={{ maxLength: 40 }}
                />

                <StyledP>Select user this bunny belongs to:</StyledP>
                {users.length > 0 ? (
                    <TextField
                        select
                        fullWidth
                        variant="filled"
                        label="Bunny User"
                        value={localBunny.userid}
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

                <StyledP>
                    Disabling the bunny means that people can't see it in the map. It doesn't affect people's scores
                </StyledP>
                <FormGroup row>
                    <FormControlLabel
                        control={<Switch checked={localBunny.enabled} onChange={handleSwitchChanged} color="primary" />}
                        label="Enabled"
                    />
                </FormGroup>
            </form>

            <StyledP>Change the colour of your bunny:</StyledP>

            <ColourPicker value={localBunny.colour} onChange={handleColourPickerChanged} />

            <StyledP>Add an optional message to be shown when the bunny is rescued</StyledP>

            <form noValidate autoComplete="off">
                <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    value={localBunny.message}
                    onChange={handleMessageChanged}
                    inputProps={{ maxLength: 255 }}
                />
            </form>

            <StyledP>Click the map to change where the bunny is hidden</StyledP>

            <MapSelect geolocate={false} location={localBunny.location} onChange={handleMapChanged} />

            <Box
                sx={{
                    marginTop: "48px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
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
                </Box>
                <Box
                    sx={{
                        position: "relative",
                    }}
                >
                    <Button
                        disabled={isSaving || localBunny.name === ""}
                        color="primary"
                        variant="contained"
                        onClick={() => onSave(localBunny)}
                        sx={{
                            marginRight: "8px",
                        }}
                    >
                        Save
                    </Button>
                    {isSaving && (
                        <CircularProgress
                            size={24}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                marginTop: "-12px",
                                marginLeft: "-12px",
                            }}
                        />
                    )}
                </Box>
            </Box>
        </>
    );
}
