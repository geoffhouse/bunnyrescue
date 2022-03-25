import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import Loading from "./Loading";
import AdminEditUser from "./AdminEditUser";
import FetchGet from "../services/FetchGet";
import ContentWrapper from "./ContentWrapper";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function PageEditUser({ times, serverlocation }) {
    const history = useHistory();
    const params = useParams();
    const [user, setUser] = React.useState(null);
    const [isSaving, setIsSaving] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        const fetchUser = async () => {
            const url = `/api/user/admin/get/${encodeURIComponent(params.userid)}`;
            try {
                setUser(await FetchGet(url));
            } catch (error) {
                enqueueSnackbar("Failed to fetch details", {
                    variant: "error",
                });
                console.error(error);
            }
        };

        fetchUser();
    }, [enqueueSnackbar, params]);

    const saveUser = async (user) => {
        setIsSaving(true);

        const url = `/api/user/admin/update/${encodeURIComponent(user._id)}`;

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
            enqueueSnackbar("Failed to save user", {
                variant: "error",
            });
            console.error(error);
        }
        setIsSaving(false);
    };

    const renderEdit = () => {
        if (user?.status !== "success") {
            return <Loading sx={{ marginTop: "2rem" }} />;
        }
        return <AdminEditUser isSaving={isSaving} user={user.data} serverlocation={serverlocation} onSave={saveUser} />;
    };

    return (
        <>
            <BackBar title="Edit User"></BackBar>
            <ContentWrapper sx={{ padding: "1rem" }} scrollable>
                {renderEdit()}
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
