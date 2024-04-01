import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CropFreeIcon from "@mui/icons-material/CropFree";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PinDropIcon from "@mui/icons-material/PinDrop";
import GradeIcon from "@mui/icons-material/Grade";
import HomeCard from "./HomeCard";
import { Link } from "react-router-dom";
import Grow from "@mui/material/Grow";
import Slide from "@mui/material/Slide";
import ordinal from "ordinal";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useApiPoller } from "../services/ApiPoller";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import QrCodeIcon from "@mui/icons-material/QrCode";
import MapIcon from "@mui/icons-material/Map";
import SummarizeIcon from "@mui/icons-material/Summarize";
import axios from "axios";

const HeaderText = styled("div")(({ theme }) => ({
    "@media (max-width:310px)": {
        marginTop: "2rem",
    },
    flexGrow: 1,
    maxWidth: "300px",
}));

const GridItem = styled(Grid)(({ theme }) => ({
    padding: "0.4rem 0",
}));

const Count = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        fontSize: 30,
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: 40,
    },
    fontWeight: 600,
}));

const HomeLink = styled(Link)(({ theme }) => ({
    color: "black",
    textDecoration: "none",
}));

const GameEnds = styled(Typography)(({ theme }) => ({
    fontSize: 18,
    marginBottom: "10px",
    fontWeight: 500,
}));

export default function Home({ times, serverprize }) {
    const theme = createTheme();
    const leader = useApiPoller({
        url: `/api/bunny/getleader/`,
        interval: 10000,
    });

    const user = useApiPoller({
        url: `/api/user/getcurrent/`,
        interval: 5000,
    });

    const left = useApiPoller({
        url: `/api/bunny/getleft/`,
        interval: 11000,
    });

    const position = useApiPoller({
        url: `/api/user/getposition/`,
        interval: 4000,
    });

    const handleReportClicked = async () => {
        const response = await axios.get("/api/user/admin/report", { responseType: "blob" });
        window.open(URL.createObjectURL(response.data));
    };

    const renderCongrats = () => {
        if (times.ended) {
            return <>Well done!</>;
        }

        if (user.data.found.length === 0) {
            return <>Good luck!</>;
        }
        if (user.data.found.length < 10) {
            return <>Great start - you're doing really well!</>;
        }
        if (user.data.found.length < 20) {
            return <>Great job!</>;
        }
        if (user.data.found.length < 30) {
            return <>Amazing job!</>;
        }
        if (user.data.found.length < 50) {
            return <>Wow!</>;
        }
        return <>That's loads!</>;
    };

    const renderPrizeTitle = () => {
        if (times.ended) {
            return <>Prizes</>;
        }
        if (user.data.found.length < serverprize) {
            return <>Win a Prize</>;
        }
        return <>You've won a prize!</>;
    };

    const renderPrizeCount = () => {
        if (times.ended) {
            if (user.data.found.length < serverprize) {
                return (
                    <>
                        You found {user.data.found.length} {user.data.found.length === 1 ? `bunny` : `bunnies`}. Sadly
                        you didn't rescue enough bunnies to win a prize
                    </>
                );
            }
            return (
                <>
                    <div>You found {user.data.found.length} bunnies.</div>
                    <div>Click here to claim your prize.</div>
                </>
            );
        }
        if (user.data.found.length < serverprize) {
            const more = serverprize - user.data.found.length;
            return (
                <>
                    Once you've found {serverprize} {serverprize === 1 ? "bunny" : "bunnies"}, click here to claim your
                    prize. You've only got to find {more} more!
                </>
            );
        } else {
            return (
                <>
                    <div>Now you've found {serverprize} bunnies, click here to claim your prize. Well done!</div>
                </>
            );
        }
    };

    const renderLeaderText = () => {
        if (times.ended) {
            if (!position.data) {
                return <>The game has ended - see the leaderboard here</>;
            }
            const ordinalText = ordinal(position.data);
            return (
                <>
                    <div>The game has now ended.</div>
                    <div>You finished in {ordinalText} place. Well done!</div>
                </>
            );
        }
        if (!times.started) {
            return (
                <>
                    <div>Once the game starts, you'll be able to track how many bunnies each user has found</div>
                </>
            );
        }
        if (leader.data === null) {
            return "There are no users on the leaderboard. Quick - you can be the first";
        }
        if (leader?.data?.name === user?.data?.name) {
            if (user.data.found.length === 0) {
                return (
                    <>
                        <div>{leader.data.name}, you're the only user on the leaderboard.</div>
                        <div> I guess that means you're winning ... sort of!</div>
                    </>
                );
            }
            return (
                <>
                    <div>
                        {leader.data.name}, you are currently at the top of the leaderboard with a total of
                        {leader.data.totalfound}! Well done!
                    </div>
                </>
            );
        }
        if (!leader.data?.totalfound === 0) {
            return (
                <>
                    <div>No-one has found any bunnies yes. Come on!</div>
                </>
            );
        }
        return (
            <>
                <div>
                    Currently, <span style={{ fontWeight: "bold" }}>{leader.data.name}</span> has rescued the most
                    bunnies - a total of {leader.data.totalfound}! Can you catch them up?
                </div>
            </>
        );
    };

    const renderLeft = () => {
        if (!times.started) {
            return (
                <>
                    <div>
                        There {left.data === 1 ? "is one bunny" : `are ${left.data} bunnies`} waiting to be rescued.
                    </div>
                    <div>The game starts in {times.startrel}</div>
                </>
            );
        }
        if (left.data === null) {
            return (
                <>
                    <div>There are loads of bunnies waiting to be rescued.</div>
                    <div>View the map to find your nearest one...</div>
                </>
            );
        } else if (left.data === 1) {
            return (
                <>
                    <div>You have just 1 bunny waiting to be rescued!</div>
                    <div>View the map to find it...</div>
                </>
            );
        }
        if (times.endssoon) {
            return (
                <>
                    <div>There are still {left.data} bunnies left to be rescued.</div>
                    <div>
                        The game ends <b>{times.endrel}</b>. Hurry up!
                    </div>
                </>
            );
        }
        return (
            <>
                <div>There are still {left.data} bunnies left to be rescued.</div>
                <div>View the map to find your nearest one...</div>
            </>
        );
    };

    const renderCount = () => {
        switch (user.data.found.length) {
            case 0:
                return <>No bunnies</>;
            case 1:
                return <>One bunny</>;
            default:
                return <>{user.data.found.length} bunnies</>;
        }
    };

    const renderHeader = () => {
        if (!times.started) {
            return (
                <HeaderText>
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }} color="textSecondary" gutterBottom>
                        Welcome, {user.data.name}!
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }} color="textSecondary">
                        The game starts
                    </Typography>
                    <Count color="textSecondary">{times.startrel}</Count>
                    <Typography sx={{ fontSize: "14px" }} color="textSecondary">
                        Get ready!
                    </Typography>
                </HeaderText>
            );
        }
        if (times.ended) {
            return (
                <HeaderText>
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }} color="textSecondary" gutterBottom>
                        Welcome, {user.data.name}!
                    </Typography>
                    <GameEnds color="textSecondary">The game has now ended</GameEnds>
                    <Typography sx={{ fontSize: "14px" }} color="textSecondary">
                        You have rescued
                    </Typography>
                    <Count color="textSecondary">{renderCount()}</Count>
                </HeaderText>
            );
        }
        if (times.endssoon) {
            return (
                <HeaderText>
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }} color="textSecondary" gutterBottom>
                        Welcome, {user.data.name}!
                    </Typography>
                    <GameEnds color="textSecondary">The game ends {times.endrel}</GameEnds>
                    <Typography sx={{ fontSize: "14px" }} color="textSecondary">
                        You have rescued
                    </Typography>
                    <Count color="textSecondary">{renderCount()}</Count>
                </HeaderText>
            );
        }
        return (
            <HeaderText>
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }} color="textSecondary" gutterBottom>
                    Welcome, {user.data.name}!
                </Typography>
                <Typography sx={{ fontSize: "14px" }} color="textSecondary">
                    You have rescued
                </Typography>
                <Count color="textSecondary">{renderCount()}</Count>
                <Typography sx={{ fontSize: "14px" }} color="textSecondary">
                    {renderCongrats()}
                </Typography>
            </HeaderText>
        );
    };

    const renderMyBunniesText = () => {
        if (times.ended) {
            return (
                <>
                    <div>List the bunnies and codes you've hidden.</div>
                    <div>Please disable them once you've collected them back up!</div>
                </>
            );
        }
        return <>List the bunnies and codes you've hidden. You can rename and move them too!</>;
    };

    const renderContent = () => {
        if (user.status !== "success") {
            return null;
        }
        if (leader.status !== "success") {
            return null;
        }
        if (left.status !== "success") {
            return null;
        }
        return (
            <>
                <GridItem item xs={12}>
                    <div style={{ padding: "1rem", textAlign: "center" }}>
                        <Box
                            sx={{
                                "@media (max-width:310px)": {
                                    flexDirection: "column",
                                },
                                flexDirection: "row",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Grow in={true}>
                                <div style={{ flexGrow: 1, maxWidth: "160px" }}>
                                    <Box
                                        sx={{
                                            img: {
                                                [theme.breakpoints.down("sm")]: {
                                                    width: "6rem",
                                                },
                                                [theme.breakpoints.up("sm")]: {
                                                    width: "8rem",
                                                },
                                                "@media (max-width:350px)": {
                                                    width: "5rem",
                                                },
                                                marginRight: "1rem",
                                                "@media (max-width:312px)": {
                                                    marginRight: "0",
                                                },
                                            },
                                        }}
                                    >
                                        <img alt="Bunny logo" src="/bunny.svg"></img>
                                    </Box>
                                </div>
                            </Grow>
                            {renderHeader()}
                        </Box>
                    </div>
                </GridItem>
                {times.ended ? null : (
                    <Slide in={true} direction="right">
                        <GridItem item xs={12}>
                            <HomeLink to="/map">
                                <HomeCard title="Find the bunnies!" subtitle={renderLeft()} icon={MapIcon}></HomeCard>
                            </HomeLink>
                        </GridItem>
                    </Slide>
                )}
                {times.ended ? null : (
                    <Slide in={true} direction="right">
                        <GridItem item xs={12}>
                            <HomeLink to="/scanbunny">
                                <HomeCard
                                    title="Scan a bunny"
                                    subtitle="Found a QR code? Scan it right here to rescue the bunny!"
                                    icon={QrCodeIcon}
                                ></HomeCard>
                            </HomeLink>
                        </GridItem>
                    </Slide>
                )}
                {times.started && (
                    <Slide in={true} direction="right">
                        <GridItem item xs={12}>
                            <HomeLink to="/prizes">
                                <HomeCard
                                    title={renderPrizeTitle()}
                                    subtitle={renderPrizeCount()}
                                    icon={GradeIcon}
                                ></HomeCard>
                            </HomeLink>
                        </GridItem>
                    </Slide>
                )}
                <Slide in={true} direction="right">
                    <GridItem item xs={12}>
                        <HomeLink to="/leaderboard">
                            <HomeCard
                                title="Leaderboard"
                                subtitle={renderLeaderText()}
                                icon={AssignmentIcon}
                            ></HomeCard>
                        </HomeLink>
                    </GridItem>
                </Slide>
                <Slide in={true} direction="right">
                    <GridItem item xs={12}>
                        <HomeLink to="/bunnies">
                            <HomeCard
                                title="My Hidden Bunnies"
                                subtitle={renderMyBunniesText()}
                                icon={PinDropIcon}
                            ></HomeCard>
                        </HomeLink>
                    </GridItem>
                </Slide>
                {user?.data?.isAdmin && (
                    <Slide in={true} direction="right">
                        <GridItem item xs={12}>
                            <HomeLink to="/admin/bunny/printnew">
                                <HomeCard
                                    title="Print new bunnies"
                                    subtitle="Create a printable page of brand new bunnies"
                                    icon={CropFreeIcon}
                                    isAdmin
                                ></HomeCard>
                            </HomeLink>
                        </GridItem>
                    </Slide>
                )}
                {user?.data?.isAdmin && (
                    <Slide in={true} direction="right">
                        <GridItem item xs={12}>
                            <HomeLink to="/admin/adduser">
                                <HomeCard
                                    title="Add New User"
                                    subtitle="Pre-register users with their email address"
                                    icon={PersonAddAltIcon}
                                    isAdmin
                                ></HomeCard>
                            </HomeLink>
                        </GridItem>
                    </Slide>
                )}
                {user?.data?.isAdmin && (
                    <Slide in={true} direction="right">
                        <GridItem item xs={12}>
                            <HomeLink to="/admin/listusers">
                                <HomeCard
                                    title="List all users"
                                    subtitle="View and edit all user details"
                                    icon={SupervisedUserCircleIcon}
                                    isAdmin
                                ></HomeCard>
                            </HomeLink>
                        </GridItem>
                    </Slide>
                )}
                {user?.data?.isAdmin && (
                    <Slide in={true} direction="right">
                        <GridItem item xs={12}>
                            <HomeLink to="/admin/listbunnies">
                                <HomeCard
                                    title="List all bunnies"
                                    subtitle="View and edit all bunny details"
                                    icon={ListAltIcon}
                                    isAdmin
                                ></HomeCard>
                            </HomeLink>
                        </GridItem>
                    </Slide>
                )}
                {user?.data?.isAdmin && (
                    <Slide in={true} direction="right">
                        <GridItem item xs={12}>
                            <HomeCard
                                nolink
                                onClick={handleReportClicked}
                                title="Create Report"
                                subtitle="Create full user report showing total bunnies found"
                                icon={SummarizeIcon}
                                isAdmin
                            ></HomeCard>
                        </GridItem>
                    </Slide>
                )}
            </>
        );
    };

    return (
        <>
            <Grid
                container
                spacing={0}
                sx={{
                    [theme.breakpoints.down("sm")]: {
                        marginTop: "56px",
                    },
                    [theme.breakpoints.up("sm")]: {
                        marginTop: "64px",
                    },
                    paddingBottom: "6rem",
                }}
            >
                {renderContent()}
            </Grid>
        </>
    );
}
