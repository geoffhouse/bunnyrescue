import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./PdfDocument";
import Button from "@mui/material/Button";
import PrintIcon from "@mui/icons-material/Print";
import { styled } from "@mui/material/styles";

const StyledLink = styled(PDFDownloadLink)(({ theme }) => ({
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
    textDecoration: "none",
    display: "inline-block",
}));

export default function PdfDownloadLinks({ qrcode, colour, bunnyName }) {
    return React.useMemo(
        () => (
            <>
                {qrcode && (
                    <StyledLink
                        document={<PdfDocument colour={colour} bunnyName={bunnyName} size="large" qrcode={qrcode} />}
                        fileName={`bunnyrescue-large-${bunnyName}.pdf`}
                    >
                        {({ blob, url, loading, error }) => (
                            <Button disabled={loading} startIcon={<PrintIcon />} color="secondary" variant="contained">
                                Large
                            </Button>
                        )}
                    </StyledLink>
                )}
                {qrcode && (
                    <StyledLink
                        document={<PdfDocument colour={colour} bunnyName={bunnyName} size="medium" qrcode={qrcode} />}
                        fileName={`bunnyrescue-medium-${bunnyName}.pdf`}
                    >
                        {({ blob, url, loading, error }) => (
                            <Button disabled={loading} startIcon={<PrintIcon />} color="secondary" variant="contained">
                                Medium
                            </Button>
                        )}
                    </StyledLink>
                )}
                {qrcode && (
                    <StyledLink
                        document={<PdfDocument colour={colour} bunnyName={bunnyName} size="small" qrcode={qrcode} />}
                        fileName={`bunnyrescue-small-${bunnyName}.pdf`}
                    >
                        {({ blob, url, loading, error }) => (
                            <Button disabled={loading} startIcon={<PrintIcon />} color="secondary" variant="contained">
                                Small
                            </Button>
                        )}
                    </StyledLink>
                )}
            </>
        ),
        [bunnyName, colour, qrcode]
    );
}
