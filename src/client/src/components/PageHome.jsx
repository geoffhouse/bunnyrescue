import React from "react";
import Navigation from "./Navigation";
import Home from "./Home";
import AppBar from "./AppBar";

export default function PageHome({ servername, times, user, serverprize }) {
    return (
        <>
            <AppBar servername={servername} times={times}></AppBar>
            <Home user={user} serverprize={serverprize} times={times}></Home>
            <Navigation value="home"></Navigation>
        </>
    );
}
