import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageHome from "./PageHome";
import PageMap from "./PageMap";
import PageFind from "./PageFind";
import PageLeaderboard from "./PageLeaderboard";
import PageAddBunny from "./PageAddBunny";
import PageScanBunny from "./PageScanBunny";
import PageAdminAddBunny from "./PageAdminAddBunny";
import PageAdminAddUser from "./PageAdminAddUser";
import PageAdminEditUser from "./PageAdminEditUser";
import PageAdminListUsers from "./PageAdminListUsers";
import PagePrivacy from "./PagePrivacy";
import PageFaq from "./PageFaq";
import PageEditBunny from "./PageEditBunny";
import PageAdminEditBunny from "./PageAdminEditBunny";
import PagePrizes from "./PagePrizes";
import PageSelectTeamName from "./PageSelectTeamName";
import PageAdminListBunnies from "./PageAdminListBunnies";
import Loading from "./Loading";
import PageRegister from "./PageRegister";
import PageListBunnies from "./PageListBunnies";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import FetchGet from "../services/FetchGet";
import { SnackbarProvider } from "notistack";
import Fade from "@mui/material/Fade";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useCookies } from "react-cookie";
import { ConfirmDialogProvider } from "./ConfirmDialog";

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo("en-GB");

export default function App() {
    const [attemptedLogin, setAttemptedLogin] = React.useState(false);
    const [server, setServer] = React.useState(null);
    const [errorText, setErrorText] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [cookies] = useCookies("userid", "userkey");

    React.useEffect(() => {
        const login = async () => {
            if (cookies.userid && cookies.userkey) {
                // confirm with server
                const url = `/api/user/login/${encodeURIComponent(cookies.userid)}/${encodeURIComponent(
                    cookies.userkey
                )}`;
                try {
                    const result = await FetchGet(url);
                    if (result.status === "success" && result.data) {
                        setUser(result.data);

                        // only load server details if we've logged in ...
                        getServerDetails();
                    }
                } catch (error) {
                    setErrorText("There was an error while trying to log in");
                    console.error(error);
                }
            }
            setAttemptedLogin(true);
        };

        login();
    }, [cookies]);

    const getServerDetails = async () => {
        const url = "/api/server/getdetails/";
        try {
            const result = await FetchGet(url);
            const now = Date.now();

            setServer({
                serverlocation: [result.data.lat, result.data.lng],
                servername: result.data.name,
                serverurl: result.data.url,
                serverprize: result.data.prize,
                times: {
                    start: result.data.startTime,
                    end: result.data.endTime,
                    started: result.data.startTime < now,
                    ended: result.data.endTime < now,
                    startrel: timeAgo.format(result?.data.startTime),
                    endrel: timeAgo.format(result?.data.endTime),
                    endssoon: result.data.endTime - 1000 * 60 * 60 * 48 < now,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    const BunnySnackbar = ({ children }) => (
        <SnackbarProvider
            hideIconVariant
            dense
            autoHideDuration="2000"
            preventDuplicate
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            TransitionComponent={Fade}
            maxSnack={3}
        >
            {children}
        </SnackbarProvider>
    );

    if (errorText) {
        // there's an error
        return <>{errorText}</>;
    }

    // we haven't tried to log in yet...
    if (!attemptedLogin) {
        return <Loading />;
    }

    // we haven't logged in - register
    if (!user || !user.enabled) {
        return (
            <BunnySnackbar>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <PageRegister />
                            </Route>
                            <Route exact path="/:email">
                                <PageRegister />
                            </Route>
                            <Route exact path="/:email/:code">
                                <PageRegister />
                            </Route>
                            <Route exact path="/find/:bunnyid">
                                <PageRegister />
                            </Route>
                        </Switch>
                    </Router>
                </ThemeProvider>
            </BunnySnackbar>
        );
    }

    // we're logged in, but the server details haven't loaded yet
    if (!server) {
        return <Loading />;
    }

    // we're logged in!

    // if there's no team name, show the page to set it
    if (user.name === "") {
        return (
            <BunnySnackbar>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <PageSelectTeamName user={user} servername={server.servername} />
                </ThemeProvider>
            </BunnySnackbar>
        );
    }

    return (
        <BunnySnackbar>
            <ThemeProvider theme={theme}>
                <ConfirmDialogProvider>
                    <CssBaseline />
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <PageHome
                                    user={user}
                                    servername={server.servername}
                                    serverprize={server.serverprize}
                                    times={server.times}
                                />
                            </Route>

                            <Route exact path="/map">
                                <PageMap
                                    user={user}
                                    servername={server.servername}
                                    serverlocation={server.serverlocation}
                                />
                            </Route>
                            <Route exact path="/bunnies">
                                <PageListBunnies
                                    user={user}
                                    servername={server.servername}
                                    serverlocation={server.serverlocation}
                                    times={server.times}
                                />
                            </Route>
                            <Route exact path="/prizes">
                                <PagePrizes servername={server.servername} serverprize={server.serverprize} />
                            </Route>
                            <Route exact path="/scanbunny">
                                <PageScanBunny
                                    user={user}
                                    servername={server.servername}
                                    serverlocation={server.serverlocation}
                                    serverurl={server.serverurl}
                                    times={server.times}
                                />
                            </Route>
                            <Route exact path="/bunny/:bunnyid">
                                <PageEditBunny
                                    user={user}
                                    servername={server.servername}
                                    serverlocation={server.serverlocation}
                                    times={server.times}
                                />
                            </Route>
                            <Route exact path="/privacy">
                                <PagePrivacy />
                            </Route>
                            <Route exact path="/faq">
                                <PageFaq />
                            </Route>
                            <Route exact path="/leaderboard">
                                <PageLeaderboard user={user} servername={server.servername} />
                            </Route>
                            <Route exact path="/addbunny">
                                <PageAddBunny
                                    user={user}
                                    servername={server.servername}
                                    serverlocation={server.serverlocation}
                                    times={server.times}
                                />
                            </Route>
                            {user.isAdmin && (
                                <Route exact path="/admin/addbunny">
                                    <PageAdminAddBunny
                                        user={user}
                                        servername={server.servername}
                                        serverlocation={server.serverlocation}
                                        times={server.times}
                                    />
                                </Route>
                            )}
                            <Route exact path="/register">
                                <PageRegister user={user} servername={server.servername} />
                            </Route>
                            <Route exact path="/find/:bunnyid">
                                <PageFind user={user} servername={server.servername} times={server.times} />
                            </Route>
                            {user.isAdmin && (
                                <Route exact path="/admin/listbunnies">
                                    <PageAdminListBunnies
                                        servername={server.servername}
                                        user={user}
                                        times={server.times}
                                    />
                                </Route>
                            )}
                            {user.isAdmin && (
                                <Route exact path="/admin/listusers">
                                    <PageAdminListUsers servername={server.servername} times={server.times} />
                                </Route>
                            )}
                            {user.isAdmin && (
                                <Route exact path="/admin/bunny/:bunnyid">
                                    <PageAdminEditBunny
                                        user={user}
                                        servername={server.servername}
                                        serverlocation={server.serverlocation}
                                        times={server.times}
                                    />
                                </Route>
                            )}
                            {user.isAdmin && (
                                <Route exact path="/admin/user/:userid">
                                    <PageAdminEditUser
                                        user={user}
                                        servername={server.servername}
                                        serverlocation={server.serverlocation}
                                        times={server.times}
                                    />
                                </Route>
                            )}
                            {user.isAdmin && (
                                <Route exact path="/admin/adduser">
                                    <PageAdminAddUser
                                        user={user}
                                        servername={server.servername}
                                        serverlocation={server.serverlocation}
                                        times={server.times}
                                    />
                                </Route>
                            )}
                            <Route exact path="/:email">
                                <PageHome
                                    user={user}
                                    servername={server.servername}
                                    serverprize={server.serverprize}
                                    times={server.times}
                                />
                            </Route>
                        </Switch>
                    </Router>
                </ConfirmDialogProvider>
            </ThemeProvider>
        </BunnySnackbar>
    );
}
