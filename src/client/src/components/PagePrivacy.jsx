import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import ContentWrapper from "./ContentWrapper";
import { styled } from "@mui/material/styles";

const Title = styled("h3")(({ theme }) => ({
    marginBottom: "0.4rem",
    marginTop: "1rem",
}));

const Text = styled("p")(({ theme }) => ({
    marginBottom: "0.4rem",
    marginTop: "0.4rem",
}));

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
                <Title>Privacy</Title>
                <Text>We don't store any user-identifiable data such as email address, location or passwords.</Text>
                <Text>
                    We do store a code, which you enter when you register. This helps secure your account. If you forget
                    it, I can't reset it so please make sure you remember it!
                </Text>
                <Text>
                    We do store the type and version of your browser when you log in. This helps us make sure the site
                    isn't being abused, and that it works properly on all browsers.
                </Text>
                <Text>
                    When choosing a username, please don't use your real name, or anything private that you don't want
                    other people to see.
                </Text>
                <Title>Cookies</Title>
                <Text>
                    We use cookies to make this site work. We stores your username, and the registration code - nothing
                    more sinister than that.
                </Text>
                <Text>If you don't allow cookies I'm afraid you won't be able to use this site.</Text>
                <Text>We don't use tracking cookies, analaytics or anything like that.</Text>
                <Title>Security</Title>
                <Text>All traffic to this website is encrypted.</Text>
                <Title>Location</Title>
                <Text>
                    If you want to use the map, you can allow the web page to use your location to update the map. You
                    don't have to.
                </Text>
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
