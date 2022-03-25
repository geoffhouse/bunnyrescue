import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import Loading from "./Loading";
import Prizes from "./Prizes";
import { useApiPoller } from "../services/ApiPoller";

export default function PagePrizes() {
    // we need to fetch this ourselves to get the up-to-date count
    const user = useApiPoller({
        url: `/api/user/getcurrent/`,
        interval: 10000,
    });

    // and this is fetched separately to get the position
    const position = useApiPoller({
        url: `/api/user/getposition/`,
        interval: 10000,
    });

    const ready = user.status === "success" && position.status === "success";

    return (
        <>
            <BackBar title="My Prizes"></BackBar>
            {ready ? <Prizes user={user.data} position={position.data} /> : <Loading sx={{ marginTop: "2rem" }} />}
            <Navigation></Navigation>
        </>
    );
}
