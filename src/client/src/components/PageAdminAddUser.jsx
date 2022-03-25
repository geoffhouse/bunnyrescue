import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import AdminAddUser from "./AdminAddUser";
import ContentWrapper from "./ContentWrapper";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function PageAdminAddUser({ times, serverlocation }) {
    const history = useHistory();
    const [isSaving, setIsSaving] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const addUser = async (user) => {
        setIsSaving(true);

        const url = `/api/user/admin/add`;

        try {
            const res = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(user),
            });
            const result = await res.json();
            if (result && result.status === "success") {
                enqueueSnackbar("Saved user details", {
                    variant: "success",
                });
                history.push("/admin/listusers");
            } else {
                throw new Error();
            }
        } catch (error) {
            enqueueSnackbar("Failed to add user", {
                variant: "error",
            });
            console.error(error);
        }
        setIsSaving(false);
    };

    return (
        <>
            <BackBar title="Add User"></BackBar>
            <ContentWrapper sx={{ padding: "1rem" }} scrollable>
                <AdminAddUser isSaving={isSaving} serverlocation={serverlocation} onSave={addUser} />
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
