import React, { useEffect } from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import ContentWrapper from "./ContentWrapper";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import { useHistory } from "react-router-dom";

export default function PageScanBunny({ serverurl }) {
    const [data, setData] = React.useState();
    const history = useHistory();

    useEffect(() => {
        if (data && data.indexOf(`${serverurl}/find/`) === 0) {
            // it's a match
            const bunnyId = data.replace(`${serverurl}/find/`, "");
            history.push(`/find/${encodeURIComponent(bunnyId)}`);
        }
    }, [data, history, serverurl]);

    return (
        <>
            <BackBar title="Scan a bunny"></BackBar>
            <ContentWrapper
                sx={{
                    paddingBottom: "6rem",
                    margin: "1rem",
                }}
                scrollable
            >
                <>
                    <>Point your phone at the Bunny code and wait for it to scan ...</>
                    <QrReader
                        constraints={{
                            facingMode: "environment",
                        }}
                        onResult={(result, error) => {
                            if (!!result) {
                                setData(result?.text);
                            }
                        }}
                        style={{ width: "100%" }}
                    />
                </>
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
