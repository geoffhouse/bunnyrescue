import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import AdminListUsers from "./AdminListUsers";
import ContentWrapper from "./ContentWrapper";

export default function PageAdminListUsers({ user, times }) {
    return (
        <>
            <BackBar title="All Users"></BackBar>
            <ContentWrapper scrollable>
                <AdminListUsers times={times}></AdminListUsers>
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
