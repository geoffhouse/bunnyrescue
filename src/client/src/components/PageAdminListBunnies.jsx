import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import AdminListBunnies from "./AdminListBunnies";
import ContentWrapper from "./ContentWrapper";

export default function PageAdminListBunnies({ user, times }) {
    return (
        <>
            <BackBar title="All Bunnies"></BackBar>
            <ContentWrapper scrollable>
                <AdminListBunnies user={user} times={times}></AdminListBunnies>
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
