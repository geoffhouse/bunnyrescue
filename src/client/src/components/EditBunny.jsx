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
import TimeAgo from "timeago-react";

const StyledP = styled("p")(({ theme }) => ({
    marginTop: "32px",
    marginBottom: "4px",
    color: "#606060",
}));

export default function EditBunny({ serverurl, isSaving = false, bunny, onSave, colour }) {
    const [localBunny, setLocalBunny] = React.useState(bunny);

    const handleNameChanged = (event) => {
        setLocalBunny({ ...localBunny, name: event.target.value });
    };

    const handleEnabledChanged = (event) => {
        setLocalBunny({ ...localBunny, enabled: event.target.checked });
    };

    const handleMissingChanged = (event) => {
        setLocalBunny({ ...localBunny, missing: event.target.checked });
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
                <StyledP sx={{ marginTop: "12px" }}>The name of your bunny:</StyledP>
                <TextField
                    fullWidth
                    variant="filled"
                    value={localBunny.name}
                    onChange={handleNameChanged}
                    label="Bunny name"
                    inputProps={{ maxLength: 40 }}
                />

                <StyledP>
                    Disabling the bunny means that people can't see it in the map. It doesn't affect people's scores
                </StyledP>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch checked={localBunny.enabled} onChange={handleEnabledChanged} color="primary" />
                        }
                        label="Enabled"
                    />
                </FormGroup>
                <StyledP>Marking this bunny as missing warns people there might be problems.</StyledP>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch checked={localBunny.missing} onChange={handleMissingChanged} color="primary" />
                        }
                        label="Missing"
                    />
                </FormGroup>
            </form>

            <StyledP>Last Found</StyledP>
            <Box
                sx={{
                    border: "1px solid rgba(0, 0, 0, 0.25)",
                    padding: "12px",
                    borderRadius: "5px",
                    color: "#666",
                }}
            >
                <TimeAgo datetime={bunny.lastfound} />
                {bunny.lastfoundby && <> by {bunny.lastfoundby}</>}
            </Box>

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
                    inputProps={{ length: 255 }}
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
