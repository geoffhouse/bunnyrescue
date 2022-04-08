import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import ContentWrapper from "./ContentWrapper";
import TemplatedContent from "./TemplatedContent";
import { styled } from "@mui/material/styles";
import KofiButton from "kofi-button";
import Box from "@mui/material/Box";

const Title = styled("h3")(() => ({
    marginBottom: "0.4rem",
    marginTop: "1rem",
}));

const Text = styled("div")(() => ({
    marginBottom: "0.4rem",
    marginTop: "0.4rem",
}));

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

                <div>
                    <Title>Support</Title>
                    <Text>
                        If you'd like to buy me a coffee and support more projects like this, please click here:
                        <Box sx={{ marginTop: "1rem" }}>
                            <KofiButton color="#0a9396" title="Donate" kofiID="F1F8C0UK8" />
                        </Box>
                    </Text>
                </div>
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
