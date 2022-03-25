import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ColourPicker from "./ColourPicker";
import Box from "@mui/material/Box";

export default function BunnyName({ name, colour, message, onUpdateState, onNextClicked }) {
    const [localName, setLocalName] = React.useState(name);
    const [localColour, setLocalColour] = React.useState(colour);
    const [localMessage, setLocalMessage] = React.useState(message);

    const handleNameChanged = (event) => {
        setLocalName(event.target.value);
        onUpdateState("name", event.target.value);
    };

    const handleMessageChanged = (event) => {
        setLocalMessage(event.target.value);
        onUpdateState("message", event.target.value);
    };

    const handleColourPickerChanged = (colour) => {
        setLocalColour(colour);
        onUpdateState("colour", colour);
    };

    return (
        <>
            <p>
                Choose a bunny name. This won't be visible on the printed sheet, but will be revealed when someone scans
                it
            </p>
            <p>Keep it simple, or make it complicated, but please make sure you don't use anyone's real name!</p>

            <form noValidate autoComplete="off">
                <TextField
                    fullWidth
                    variant="filled"
                    value={localName}
                    onChange={handleNameChanged}
                    label="Enter a name ..."
                    inputProps={{ maxLength: 40 }}
                />
            </form>

            <p>Next, choose a colour for your bunny. It's just for fun.</p>
            <ColourPicker value={localColour} onChange={handleColourPickerChanged} />

            <p>You can add an optional message to be shown when the bunny is rescued</p>

            <form noValidate autoComplete="off">
                <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    value={localMessage}
                    onChange={handleMessageChanged}
                    inputProps={{ maxLength: 255 }}
                />
            </form>

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
                    disabled={localName === ""}
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
