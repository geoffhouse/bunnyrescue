import React from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./PdfDocument";
import QRCode from "qrcode";
import { isMobile } from "react-device-detect";
import PrintIcon from "@mui/icons-material/Print";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Loading from "./Loading";

const DownloadButton = styled(PDFDownloadLink)(({ theme }) => ({
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
    textDecoration: "none",
    display: "inline-block",
}));

export default function BunnyPrint({ serverurl, bunnyId, colour, name, onNextClicked }) {
    const [qrCode, setQrCode] = React.useState(null);

    React.useEffect(() => {
        const getQrCode = async () => {
            const text = `${serverurl}/find/${encodeURIComponent(bunnyId)}`;
            try {
                const result = await QRCode.toDataURL(text);
                setQrCode(result);
            } catch (err) {
                console.error(err);
            }
        };

        getQrCode();
    }, [bunnyId, serverurl]);

    if (!qrCode) {
        return <Loading sx={{ marginTop: "2rem" }} />;
    }
    return (
        <>
            <p>
                Your bunny has been created. Now you can view or print a PDF document containing the special QR code for
                people to scan.
            </p>
            <p>
                There are three sizes available. Each is designed to be printed on A4 paper, but you can cut out the
                smaller ones.
            </p>
            {isMobile && (
                <p>
                    Clicking the buttons below may open the PDF in a new tab. Close the tab once you've finished
                    printing.
                </p>
            )}

            <Box
                sx={{
                    textAlign: "center",
                    marginTop: "2rem",
                    marginBottom: "24px",
                }}
            >
                <DownloadButton
                    document={<PdfDocument colour={colour} bunnyName={name} size="large" qrcode={qrCode} />}
                    fileName={`bunnyrescue-large-${name}.pdf`}
                >
                    {({ loading }) =>
                        loading ? (
                            "Loading document..."
                        ) : (
                            <Button startIcon={<PrintIcon />} color="secondary" variant="contained">
                                Large
                            </Button>
                        )
                    }
                </DownloadButton>
                <DownloadButton
                    document={<PdfDocument colour={colour} bunnyName={name} size="medium" qrcode={qrCode} />}
                    fileName={`bunnyrescue-medium-${name}.pdf`}
                >
                    {({ loading }) =>
                        loading ? (
                            "Loading document..."
                        ) : (
                            <Button startIcon={<PrintIcon />} color="secondary" variant="contained">
                                Medium
                            </Button>
                        )
                    }
                </DownloadButton>
                <DownloadButton
                    document={<PdfDocument colour={colour} bunnyName={name} size="small" qrcode={qrCode} />}
                    fileName={`bunnyrescue-small-${name}.pdf`}
                >
                    {({ loading }) =>
                        loading ? (
                            "Loading document..."
                        ) : (
                            <Button startIcon={<PrintIcon />} color="secondary" variant="contained">
                                Small
                            </Button>
                        )
                    }
                </DownloadButton>
            </Box>

            <Divider />

            <Box
                sx={{
                    marginTop: "24px",
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
                    Finish
                </Button>
            </Box>
        </>
    );
}
