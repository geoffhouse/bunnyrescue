import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import ContentWrapper from "./ContentWrapper";
import { QrReader } from "@blackbox-vision/react-qr-reader";

export default function PageFaq() {
    const [data, setData] = React.useState("No result");

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
                    <QrReader
                        onResult={(result, error) => {
                            if (!!result) {
                                setData(result?.text);
                            }

                            if (!!error) {
                                console.info(error);
                            }
                        }}
                        style={{ width: "100%" }}
                    />
                    <p>{data}</p>
                </>
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
