import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import Loading from "./Loading";
import EditBunny from "./EditBunny";
import FetchGet from "../services/FetchGet";
import ContentWrapper from "./ContentWrapper";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function PageEditBunny({ times, serverlocation, serverurl }) {
    const history = useHistory();
    const params = useParams();
    const [bunny, setBunny] = React.useState(null);
    const [isSaving, setIsSaving] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        const fetchBunny = async () => {
            const url = "/api/bunny/get/" + encodeURIComponent(params.bunnyid);
            try {
                setBunny(await FetchGet(url));
            } catch (error) {
                enqueueSnackbar("Failed to fetch details", {
                    variant: "error",
                });
                console.error(error);
            }
        };

        fetchBunny();
    }, [enqueueSnackbar, params]);

    const saveBunny = async (bunny) => {
        setIsSaving(true);

        const url = "/api/bunny/update/";

        try {
            const res = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(bunny),
            });
            const result = await res.json();
            if (result) {
                enqueueSnackbar("Saved bunny details", {
                    variant: "success",
                });
                history.push("/bunnies");
            } else {
                enqueueSnackbar("Failed to save bunny", {
                    variant: "error",
                });
            }
        } catch (error) {
            enqueueSnackbar("Failed to save bunny", {
                variant: "error",
            });
            console.error(error);
        }
        setIsSaving(false);
    };

    const renderEdit = () => {
        if (bunny?.status !== "success") {
            return <Loading sx={{ marginTop: "2rem" }} />;
        }
        return (
            <EditBunny
                serverurl={serverurl}
                isSaving={isSaving}
                bunny={bunny.data}
                serverlocation={serverlocation}
                onSave={saveBunny}
            />
        );
    };

    if (times?.ended) {
        history.push("/");
    }

    return (
        <>
            <BackBar title="Edit Bunny"></BackBar>
            <ContentWrapper sx={{ padding: "1rem" }} scrollable>
                {renderEdit()}
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
