import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function HomeCard({ icon, nolink = false, title, subtitle, isAdmin = false }) {
    const Icon = icon;

    return (
        <Card
            sx={{
                margin: "0 0.5rem",
                borderWidth: "0px",
                borderRadius: "10px",
                backgroundColor: isAdmin ? "primary.main" : "white",
            }}
            variant="outlined"
        >
            <CardContent
                component="div"
                sx={{
                    padding: "10px !important",
                }}
            >
                <Box
                    sx={{
                        "@media (max-width:400px)": {
                            gridTemplateColumns: "60px auto 25px",
                        },
                        "@media (max-width:320px)": {
                            gridTemplateColumns: "50px auto 25px",
                        },
                        display: "inline-grid",
                        width: "100%",
                        gridTemplateColumns: "75px auto 25px",
                        alignItems: "flex-start",
                    }}
                >
                    <div
                        style={{
                            gridColumn: "1",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                    >
                        <Icon
                            sx={{
                                "@media (max-width:400px)": {
                                    width: "2em",
                                    height: "2em",
                                },
                                "@media (max-width:320px)": {
                                    width: "1.8em",
                                    height: "1.8em",
                                },
                                width: "2.5em",
                                height: "2.5em",
                                marginRight: "0.5rem",
                                color: isAdmin ? "#ffffff" : "#000000",
                                opacity: 0.6,
                            }}
                        ></Icon>
                    </div>
                    <div
                        style={{
                            gridColumn: "2",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "15px",
                                fontWeight: 600,
                                marginBottom: "0.1em",
                                color: isAdmin ? "white" : "#00000099",
                            }}
                            color="textSecondary"
                            gutterBottom
                        >
                            {title}
                        </Typography>
                        <Typography
                            component="div"
                            sx={{
                                fontSize: "13px",
                                color: isAdmin ? "white" : "#00000099",
                            }}
                            color="textSecondary"
                        >
                            {subtitle}
                        </Typography>
                        {isAdmin && (
                            <Box
                                sx={{
                                    color: "white",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    opacity: 0.5,
                                    marginTop: "4px",
                                }}
                            >
                                ADMIN ONLY
                            </Box>
                        )}
                    </div>
                    {nolink ? null : (
                        <div
                            style={{
                                gridColumn: "3",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            <ChevronRightIcon style={{ opacity: 0.5 }} />
                        </div>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
