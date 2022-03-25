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

export default function PageFaq() {
    return (
        <>
            <BackBar title="Help & Questions"></BackBar>
            <ContentWrapper
                sx={{
                    paddingBottom: "6rem",
                    margin: "1rem",
                }}
                scrollable
            >
                <Title>Is there a deadline?</Title>
                <Text>
                    There is, but you have plenty of time. The hunt takes place for two weeks, so there's no need to
                    rush.
                </Text>

                <Title>How do I scan QR Codes to find bunnies?</Title>
                <Text>On iPhones and iPads, you can use Google Chrome or the camera app to scan the code.</Text>
                <Text>On Android you can use the camera app or 'Lens' app to scan the qr code.</Text>
                <Text>
                    There's a useful guide at{" "}
                    <a
                        href="https://www.hellotech.com/guide/for/how-to-scan-qr-code-iphone-android"
                        target="_blank"
                        rel="noreferrer"
                    >
                        hellotech.com
                    </a>
                    .
                </Text>

                <Title>How do I win?</Title>
                <Text>
                    Once you have found a certain amount of bunnies, you win a small prize. Details on how to collect
                    this prize will be available in the registration email.
                </Text>
                <Text>
                    Secondly, there's a prize for the person who finds the most bunnies. In the event of a tie, a winner
                    will be drawn at random.
                </Text>

                <Title>How do I get help/support?</Title>
                <Text>
                    The best place to start is on the FOTJS Facebook page:
                    <a href="https://www.facebook.com/groups/FoTJS" target="_blank" rel="noreferrer">
                        https://www.facebook.com/groups/FoTJS
                    </a>
                </Text>

                <Title>More about Bunny Rescue</Title>
                <Text>
                    Bunny rescue is a web application written by me -
                    <a href="mailto:geoff@housesathome.co.uk">Geoff House</a> for use by Turnfurlong Junior School. If
                    it's successful, I'll probably give it away to other schools to use!
                </Text>
                <Text>
                    It's written in{" "}
                    <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
                        React
                    </a>{" "}
                    +{" "}
                    <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">
                        Node.js
                    </a>{" "}
                    and runs on a{" "}
                    <a href="https://www.digitalocean.com/" target="_blank" rel="noreferrer">
                        DigitalOcean
                    </a>{" "}
                    cloud server.
                </Text>
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
