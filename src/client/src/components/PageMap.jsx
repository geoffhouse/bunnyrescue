import React from "react";
import Navigation from "./Navigation";
import Map from "./Map";
import BackBar from "./BackBar";

export default function PageMap({ serverlocation }) {
    return (
        <>
            <BackBar title="Find a Bunny" position="sticky"></BackBar>
            <Map serverlocation={serverlocation}></Map>
            <Navigation value="map"></Navigation>
        </>
    );
}
