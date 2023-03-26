import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import ContentWrapper from "./ContentWrapper";
import Button from "@mui/material/Button";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PdfMultiDocument from "./PdfMultiDocument";
import { isMobile } from "react-device-detect";
import PrintIcon from "@mui/icons-material/Print";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Loading from "./Loading";
import FetchGet from "../services/FetchGet";
import QRCode from "qrcode";

const DownloadButton = styled(PDFDownloadLink)(({ theme }) => ({
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
    textDecoration: "none",
    display: "inline-block",
}));

export default function PagePrintAll({ serverurl, user, times }) {
    const [bunnies, setBunnies] = React.useState([]);

    React.useEffect(() => {
        const getList = async () => {
            try {
                const url = `/api/bunny/ownedlist`;
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
                setBunnies(result?.data);
            } catch (err) {
                console.error(err);
            }
        };

        getList();
    }, [serverurl]);

    return (
        <>
            <BackBar title="Print All Bunnies"></BackBar>
            <ContentWrapper scrollable sx={{ padding: "1rem" }}>
                {bunnies.length === 0 ? (
                    <Loading sx={{ marginTop: "2rem" }} />
                ) : (
                    <>
                        <p>This page allows you to print multiple bunny QR codes on the same page.</p>
                        {isMobile && (
                            <p>
                                Clicking the buttons below may open the PDF in a new tab. Close the tab once you've
                                finished printing.
                            </p>
                        )}

                        <Box
                            sx={{
                                textAlign: "center",
                                marginTop: "2rem",
                                marginBottom: "24px",
                            }}
                        >
                            {/* <PDFViewer style={{ height: "800px", width: "900px" }}>
                                <PdfMultiDocument bunnies={bunnies} />
                            </PDFViewer> */}
                            <DownloadButton
                                document={<PdfMultiDocument bunnies={bunnies} />}
                                fileName={`bunnyrescue-multiple.pdf`}
                            >
                                {({ loading }) => (
                                    <Button
                                        disabled={loading}
                                        startIcon={<PrintIcon />}
                                        color="secondary"
                                        variant="contained"
                                    >
                                        Multiple
                                    </Button>
                                )}
                            </DownloadButton>
                        </Box>
                    </>
                )}
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
