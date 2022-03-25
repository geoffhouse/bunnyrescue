import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import Leaderboard from "./Leaderboard";

export default function PageLeaderboard() {
    return (
        <>
            <BackBar title="Leaderboard"></BackBar>
            <Leaderboard />
            <Navigation value="leaderboard"></Navigation>
        </>
    );
}
