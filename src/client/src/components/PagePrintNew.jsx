import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import ContentWrapper from "./ContentWrapper";
import Button from "@mui/material/Button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfMultiDocument from "./PdfMultiDocument";
import PrintIcon from "@mui/icons-material/Print";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FetchGet from "../services/FetchGet";
import QRCode from "qrcode";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";

const DownloadButton = styled(PDFDownloadLink)(({ theme }) => ({
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
    textDecoration: "none",
    display: "inline-block",
}));

export default function PagePrintNew({ serverurl, user, times }) {
    const [pageCount, setPageCount] = React.useState(0);
    const [bunnies, setBunnies] = React.useState([]);
    const [printedBunnies, setPrintedBunnies] = React.useState(false);
    const [generatedBunnyTime, setGeneratedBunnyTime] = React.useState(null);

    React.useEffect(() => {
        if (pageCount > 0 && !printedBunnies) {
            const getList = async () => {
                try {
                    const url = `/api/bunny/newlist/${pageCount}`;
                    const result = await FetchGet(url);
                    for (const eachBunny of result.data) {
                        const text = `${serverurl}/find/${encodeURIComponent(eachBunny._id)}`;
                        try {
                            const qrCode = await QRCode.toDataURL(text);
                            eachBunny.qrCode = qrCode;
                        } catch (err) {
                            console.error(err);
                        }
                    }
                    // set time
                    const date = new Date();
                    setGeneratedBunnyTime(date.toLocaleTimeString());
                    setBunnies(result?.data);
                } catch (err) {
                    console.error(err);
                }
            };

            getList();
        }
    }, [serverurl, pageCount, printedBunnies]);

    return (
        <>
            <BackBar title="Print New Bunnies"></BackBar>
            <ContentWrapper scrollable sx={{ padding: "1rem" }}>
                <>
                    <p>This template prints out 6 unique bunnies per page. How many pages would you like?</p>

                    <FormControl sx={{ minWidth: "12rem" }} fullWidth>
                        <InputLabel id="demo-simple-select-label">Page Count</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={pageCount}
                            label="Page Count"
                            onChange={(e) => {
                                setPageCount(e.target.value);
                            }}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                    </FormControl>

                    {bunnies.length > 0 && (
                        <>
                            <p>Bunnies last generated at {generatedBunnyTime}</p>

                            <Box
                                sx={{
                                    textAlign: "center",
                                    marginTop: "2rem",
                                    marginBottom: "24px",
                                }}
                            >
                                <DownloadButton
                                    document={<PdfMultiDocument bunnies={bunnies} />}
                                    fileName={`bunnyrescue-multiple.pdf`}
                                >
                                    {({ loading }) => (
                                        <Button
                                            disabled={loading || printedBunnies}
                                            startIcon={<PrintIcon />}
                                            color="secondary"
                                            variant="contained"
                                            onClick={() => {
                                                setPrintedBunnies(true);
                                            }}
                                        >
                                            Print Bunnies
                                        </Button>
                                    )}
                                </DownloadButton>

                                <Button
                                    startIcon={<PrintIcon />}
                                    color="secondary"
                                    variant="contained"
                                    disabled={!printedBunnies}
                                    onClick={() => {
                                        setPrintedBunnies(false);
                                    }}
                                >
                                    Refresh
                                </Button>
                            </Box>
                            <Alert severity="error" variant="filled">
                                Each bunny has a unique code. Don't print more than one copy - just click the 'refresh'
                                button.
                            </Alert>
                        </>
                    )}
                </>
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
