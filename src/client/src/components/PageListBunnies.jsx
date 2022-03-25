import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import ListBunnies from "./ListBunnies";
import ContentWrapper from "./ContentWrapper";

export default function PageListBunnies({ user, times }) {
    return (
        <>
            <BackBar title="My Bunnies"></BackBar>
            <ContentWrapper scrollable>
                <ListBunnies user={user} times={times}></ListBunnies>
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
