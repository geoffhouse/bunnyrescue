import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MapSelect from "./MapSelect";
import ColourPicker from "./ColourPicker";
import PdfDownloadLinks from "./PdfDownloadLinks";
import CircularProgress from "@mui/material/CircularProgress";
import QRCode from "qrcode";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useDebounce } from "use-debounce";

const StyledP = styled("p")(({ theme }) => ({
    marginTop: "32px",
    color: "#606060",
}));

export default function EditBunny({ serverurl, isSaving = false, bunny, onSave, colour }) {
    const [qrCode, setQrCode] = React.useState(null);
    const [localBunny, setLocalBunny] = React.useState(bunny);
    const [debouncedBunny] = useDebounce(localBunny, 1000);

    React.useEffect(() => {
        const getQrCode = async () => {
            const text = `${serverurl}/find/${encodeURIComponent(localBunny._id)}`;
            try {
                const result = await QRCode.toDataURL(text);
                setQrCode(result);
            } catch (err) {
                console.error(err);
            }
        };

        getQrCode();
    }, [localBunny, serverurl]);

    const handleNameChanged = (event) => {
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

    const renderPrintLinks = () => {
        if (qrCode) {
            return <PdfDownloadLinks colour={colour} bunnyName={debouncedBunny.name} qrcode={qrCode} />;
        }
        return null;
    };

    return (
        <>
            <form noValidate autoComplete="off">
                <StyledP>The name of your bunny:</StyledP>
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
                    inputProps={{ length: 255 }}
                />
            </form>

            <StyledP>Click the map to change where the bunny is hidden</StyledP>

            <MapSelect geolocate={false} location={localBunny.location} onChange={handleMapChanged} />

            <StyledP>Print the bunny code on A4 paper:</StyledP>
            {renderPrintLinks()}

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
