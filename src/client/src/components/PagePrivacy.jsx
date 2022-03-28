import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import ContentWrapper from "./ContentWrapper";
import TemplatedContent from "./TemplatedContent";

export default function PagePrivacy() {
    return (
        <>
            <BackBar title="Privacy"></BackBar>
            <ContentWrapper
                scrollable
                sx={{
                    padding: "1rem",
                }}
            >
                <TemplatedContent templateName="privacy" />
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
