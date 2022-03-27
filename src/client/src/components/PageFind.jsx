import React from "react";
import delay from "delay";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import FetchGet from "../services/FetchGet";
import Grow from "@mui/material/Grow";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";

const Page = styled("div")(({ theme }) => ({
    padding: "1rem",
}));

const Action = styled("div")(({ theme }) => ({
    textAlign: "center",
}));

const RescueText = styled("div")(({ theme }) => ({
    margin: "1rem",
    textAlign: "center",
    fontSize: "1.1rem",
}));

const BunnyName = styled("div")(({ theme }) => ({
    textAlign: "center",
    fontSize: "30px",
    margin: "1rem",
    fontWeight: "bold",
}));

const BunnyMessage = styled("div")(({ theme }) => ({
    textAlign: "center",
    fontSize: "20px",
    margin: "1rem",
    whiteSpace: "pre-wrap",
}));

const BunnyLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
}));

export default function PageFind({ times }) {
    const [status, setStatus] = React.useState(null);
    const [bunny, setBunny] = React.useState({});
    const [stage, setStage] = React.useState(0);
    const params = useParams();

    React.useEffect(() => {
        const rescueBunny = async () => {
            const url = "/api/bunny/rescue/" + encodeURIComponent(params.bunnyid);
            try {
                const result = await FetchGet(url);
                if (result.status === "success") {
                    setBunny(result?.data?.bunny);
                    setStatus(result?.data?.status);
                }
                return;
            } catch (error) {
                console.error(error);
            }
            setStatus("retry");
        };
        rescueBunny();
    }, [params]);

    const colourBunny = async () => {
        await delay(2000);
        setStage(1);
    };

    const SmallBunny = ({ variant }) => (
        <Box sx={{ textAlign: "center" }}>
            <img alt="Small bunny" style={{ width: "30%" }} src={`/bunnies/bunny-${variant}.svg`} />
        </Box>
    );

    // states are:
    // duplicate = already found
    // added - all ok - next stage
    // retry - error - reload page button
    // notstarted
    // ended

    //tested OK
    if (status === "notstarted") {
        return (
            <Page>
                <RescueText>Sorry - the game hasn't started yet!</RescueText>
                <SmallBunny variant="natural" />
                <Box sx={{ textAlign: "center", fontSize: "20px", margin: "1rem" }}>Try again {times.startrel}</Box>

                <Action>
                    <BunnyLink to="/">
                        <Button color="secondary" variant="contained">
                            Home
                        </Button>
                    </BunnyLink>
                </Action>
            </Page>
        );
    }

    //TODO - needs testing
    if (status === "ended") {
        return (
            <Page>
                <RescueText>Sorry - the game has ended</RescueText>
                <SmallBunny variant="natural" />

                <Action style={{ marginTop: "2rem" }}>
                    <BunnyLink to="/">
                        <Button color="secondary" variant="contained">
                            Home
                        </Button>
                    </BunnyLink>
                </Action>
            </Page>
        );
    }

    //tested OK
    if (status === "duplicate") {
        return (
            <Fade in={true}>
                <Page>
                    <RescueText>You have already found</RescueText>
                    <SmallBunny variant={bunny.colour} />
                    <BunnyName>{bunny.name}</BunnyName>
                    <BunnyMessage>{bunny.message}</BunnyMessage>

                    <Action>
                        <BunnyLink to="/">
                            <Button color="secondary" variant="contained">
                                Home
                            </Button>
                        </BunnyLink>
                    </Action>
                </Page>
            </Fade>
        );
    }

    //TESTED OK
    if (status === "owned") {
        return (
            <Fade in={true}>
                <Page>
                    <RescueText>You can't rescue your own bunny!</RescueText>
                    <SmallBunny variant={bunny.colour} />
                    <BunnyName>{bunny.name}</BunnyName>

                    <Action>
                        <BunnyLink to={`/bunny/${bunny._id}`}>
                            <Button color="secondary" variant="contained">
                                Edit
                            </Button>
                        </BunnyLink>
                    </Action>
                </Page>
            </Fade>
        );
    }

    //TESTED OK
    if (status === "retry") {
        return (
            <>
                <Page>
                    <RescueText>There was a problem rescuing this bunny</RescueText>
                    <Action>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => {
                                window.location.reload();
                            }}
                        >
                            Try Again
                        </Button>
                    </Action>
                </Page>
            </>
        );
    }

    //tested OK
    if (status === "added") {
        colourBunny();
        if (stage === 0) {
            return (
                <>
                    <Grow in={true}>
                        <Fade in={true}>
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        alignSelf: "center",
                                        display: "flex",
                                    }}
                                >
                                    <img
                                        alt="Large bunny"
                                        style={{
                                            width: "100%",
                                            objectFit: "contain",
                                        }}
                                        src={`/bunnies/bunny-${bunny.colour}.svg`}
                                    />
                                </Box>
                            </Box>
                        </Fade>
                    </Grow>
                </>
            );
        }
        if (stage === 1) {
            return (
                <Fade in={true}>
                    <Page>
                        <RescueText>Well done - you have rescued</RescueText>
                        <SmallBunny variant={bunny.colour} />
                        <BunnyName>{bunny.name}</BunnyName>
                        <BunnyMessage>{bunny.message}</BunnyMessage>

                        <Action>
                            <BunnyLink to="/">
                                <Button color="secondary" variant="contained">
                                    Save Bunny
                                </Button>
                            </BunnyLink>
                        </Action>
                    </Page>
                </Fade>
            );
        }
    }

    return (
        <Page>
            <RescueText>Sorry - there was a problem.</RescueText>
            <SmallBunny variant="natural" />
            <Box sx={{ textAlign: "center", fontSize: "15px", margin: "1rem" }}>
                Either the bunny has been deleted, disabled or the QR code wasn't scanned correctly.
            </Box>

            <Action>
                <BunnyLink to="/">
                    <Button color="secondary" variant="contained">
                        Home
                    </Button>
                </BunnyLink>
            </Action>
        </Page>
    );
}
