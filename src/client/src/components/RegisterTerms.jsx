import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function RegisterTerms({ servername, onBackClicked, onNextClicked }) {
    const [read, setRead] = React.useState(false);

    React.useEffect(() => {
        if (document.getElementById("root").clientHeight > 830) {
            setRead(true);
        }
        setTimeout(() => {
            setRead(true);
        }, 10000);
    }, []);

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 20;
        if (bottom) {
            setRead(true);
        }
    };

    const handleNextClicked = () => {
        window.location = "/";
    };

    return (
        <>
            <Box
                sx={{
                    overflow: "scroll",
                    position: "absolute",
                    width: "100%",
                    top: 0,
                    bottom: "68px",
                }}
                onScroll={handleScroll}
            >
                <Box
                    sx={{
                        margin: "1rem",
                    }}
                >
                    <Box
                        sx={{
                            fontSize: "2rem",
                            fontWeight: 500,
                            textAlign: "center",
                        }}
                    >
                        {servername}
                    </Box>
                    <Box
                        sx={{
                            maxWidth: "24rem",
                            margin: "auto",
                        }}
                    >
                        <h3>A few things ...</h3>
                        <p>You use this site at your own risk. </p>
                        <p>Don't walk into the road or busy traffic while using your phone. </p>
                        <p>
                            If your child drops your expensive phone while using this web page, I'm afraid that's your
                            problem.
                        </p>

                        <h3>Privacy</h3>
                        <p>We don't store any user-identifiable data such as real names, locations or passwords.</p>
                        <p>
                            When choosing a username, please don't use your actual name, or anything private that you
                            don't want other people to see.
                        </p>
                        <p>
                            We use cookies to make this site work. We store your user ID and a randomly-generated key -
                            nothing more sinister than that.
                        </p>
                        <p>If you don't allow cookies I'm afraid you won't be able to use this site.</p>
                        <p>We don't use tracking cookies, analaytics or anything like that.</p>
                        <p>All traffic to this website is encrypted.</p>
                        <p>
                            If you want to use the map, you can allow the web page to use your location to update the
                            map. You don't have to.
                        </p>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    position: "fixed",
                    width: "100%",
                    bottom: "0",
                    padding: "0 1rem",
                    backgroundColor: "#f3f3f3",
                    borderTop: "1px solid #ccc",
                }}
            >
                <Box
                    sx={{
                        maxWidth: "24rem",
                        margin: "auto",
                        marginBottom: "1rem",
                    }}
                >
                    <Box
                        sx={{
                            marginTop: "1rem",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                            }}
                        >
                            <Button
                                color="secondary"
                                variant="contained"
                                disabled={true}
                                sx={{
                                    marginRight: "8px",
                                }}
                            >
                                Back
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                position: "relative",
                            }}
                        >
                            <Button
                                disabled={!read}
                                color="primary"
                                variant="contained"
                                onClick={handleNextClicked}
                                sx={{
                                    marginRight: "8px",
                                }}
                            >
                                Agree
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
