import React from "react";
import GradeIcon from "@mui/icons-material/Grade";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ordinal from "ordinal";
import ContentWrapper from "./ContentWrapper";

export default function Prizes({ user, position }) {
    return (
        <ContentWrapper scrollable sx={{ padding: "1rem" }}>
            <Box
                sx={{
                    "@media (max-width:440px)": {
                        fontSize: "2.2rem",
                    },
                    fontSize: "3rem",
                    textAlign: "center",
                    marginBottom: "2rem",
                }}
            >
                {user.name}
            </Box>
            <Grid container>
                <Grid
                    item
                    sx={{
                        flexGrow: 0,
                        maxWidth: "100%",
                        flexBasis: "100%",
                        "@media (min-width:320px)": {
                            flexGrow: 0,
                            maxWidth: "50%",
                            flexBasis: "50%",
                        },
                    }}
                >
                    <Grid
                        container
                        direction="column"
                        sx={{
                            position: "relative",
                            "@media (max-width:320px)": {
                                marginBottom: "1rem",
                                borderBottom: "2px dotted #ccc",
                                paddingBottom: "1rem",
                            },
                            marginBottom: 0,
                            borderBottom: "none",
                            paddingBottom: 0,
                        }}
                    >
                        <Grid item sx={{ fontSize: "1.3rem", textAlign: "center" }}>
                            Rescued
                        </Grid>
                        <Grid item sx={{ textAlign: "center" }}>
                            <Box
                                component="img"
                                src="bunny-blank.svg"
                                sx={{
                                    "@media (max-width:440px)": {
                                        width: "100px",
                                    },
                                    width: "150px",
                                }}
                            />
                            <Box
                                sx={{
                                    "@media (max-width:440px)": {
                                        fontSize: "36px",
                                        top: "100px",
                                    },
                                    fontWeight: "bold",
                                    position: "absolute",
                                    textAlign: "center",
                                    top: "133px",
                                    width: "100%",
                                    fontSize: "54px",
                                }}
                            >
                                {user.found.length}
                            </Box>
                        </Grid>
                        <Grid item sx={{ fontSize: "1.3rem", textAlign: "center" }}>
                            {user.found.length === 1 ? `bunny` : `bunnies`}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    sx={{
                        flexGrow: 0,
                        maxWidth: "100%",
                        flexBasis: "100%",
                        "@media (min-width:320px)": {
                            flexGrow: 0,
                            maxWidth: "50%",
                            flexBasis: "50%",
                        },
                    }}
                >
                    <Grid container direction="column" sx={{ position: "relative" }}>
                        <Grid item sx={{ fontSize: "1.3rem", textAlign: "center" }}>
                            You are in
                        </Grid>
                        <Grid item sx={{ textAlign: "center" }}>
                            <GradeIcon
                                sx={{
                                    "@media (max-width:440px)": {
                                        fontSize: "144px",
                                    },
                                    fontSize: "214px",
                                    textAlign: "center",
                                    color: "#ffcc00",
                                }}
                            />
                            <Box
                                sx={{
                                    "@media (max-width:440px)": {
                                        fontSize: "21px",
                                        top: "94px",
                                    },
                                    position: "absolute",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    top: "118px",
                                    width: "100%",
                                    fontSize: "30px",
                                }}
                            >
                                {position === 0 ? null : ordinal(position)}
                            </Box>
                        </Grid>
                        <Grid item sx={{ fontSize: "1.3rem", textAlign: "center" }}>
                            place
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ContentWrapper>
    );
}
