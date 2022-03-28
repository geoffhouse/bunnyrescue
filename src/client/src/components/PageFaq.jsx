import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import ContentWrapper from "./ContentWrapper";
import TemplatedContent from "./TemplatedContent";

export default function PageFaq() {
    return (
        <>
            <BackBar title="Help & Questions"></BackBar>
            <ContentWrapper
                sx={{
                    padding: "1rem",
                }}
                scrollable
            >
                <TemplatedContent templateName="faq" />
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
