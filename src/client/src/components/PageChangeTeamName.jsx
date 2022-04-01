import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import ChangeTeamName from "./ChangeTeamName";
import ContentWrapper from "./ContentWrapper";

export default function PageListBunnies({ user, times }) {
    return (
        <>
            <BackBar title="Change Team Name"></BackBar>
            <ContentWrapper scrollable>
                <ChangeTeamName user={user} />
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
