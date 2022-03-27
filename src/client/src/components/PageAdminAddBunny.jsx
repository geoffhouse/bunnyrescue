import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import BunnyName from "./BunnyName";
import AdminBunnyOwner from "./AdminBunnyOwner";
import BunnyLocation from "./BunnyLocation";
import BunnyStepper from "./BunnyStepper";
import BunnyPrint from "./BunnyPrint";
import ContentWrapper from "./ContentWrapper";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import FetchGet from "../services/FetchGet";

export default function PageAdminAddBunny({ user, serverurl, servername, serverlocation, times }) {
    const history = useHistory();
    const [step, setStep] = React.useState(0);
    const [isCreating, setIsCreating] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const [bunny, setBunny] = React.useState({
        name: "",
        userid: "",
        colour: "natural",
        location: null,
        bunnyId: null,
    });

    React.useEffect(() => {
        const getCurrentUser = async () => {
            const url = `/api/user/getcurrent`;
            const result = await FetchGet(url);
            if (result.status === "success") {
                setBunny((b) => ({ ...b, userid: result.data._id }));
            }
        };

        getCurrentUser();
    }, []);

    const handleUpdateState = (key, value) => {
        setBunny({ ...bunny, [key]: value });
    };

    const handleFinishClicked = () => {
        history.push(`/`);
    };

    const createBunny = async () => {
        setIsCreating(true);

        const url = "/api/bunny/admin/add/";

        const postData = {
            name: bunny.name,
            userid: bunny.userid,
            location: bunny.location,
            colour: bunny.colour,
            message: bunny.message,
        };

        try {
            const res = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(postData),
            });
            const result = await res.json();
            if (result.status === "success" && result.data) {
                setBunny({ ...bunny, bunnyId: result.data });
                setStep(3);
            } else {
                throw new Error();
            }
        } catch (error) {
            // an error
            enqueueSnackbar("Failed to create bunny", {
                variant: "error",
            });
            console.error(error);
        }
        setIsCreating(false);
    };

    return (
        <>
            <BackBar title="Hide a Bunny"></BackBar>
            <ContentWrapper
                scrollable
                sx={{
                    paddingBottom: "6rem",
                    padding: "1rem",
                }}
            >
                <BunnyStepper step={step} const steps={["Owner", "Customise", "Location", "Print Code"]}></BunnyStepper>
                {step === 0 && (
                    <AdminBunnyOwner
                        onNextClicked={() => setStep(1)}
                        onUpdateState={(key, value) => handleUpdateState(key, value)}
                        userid={bunny.userid}
                    />
                )}
                {step === 1 && (
                    <BunnyName
                        onNextClicked={() => setStep(2)}
                        onUpdateState={(key, value) => handleUpdateState(key, value)}
                        name={bunny.name}
                        colour={bunny.colour}
                    />
                )}
                {step === 2 && (
                    <BunnyLocation
                        onBackClicked={() => setStep(1)}
                        onNextClicked={createBunny}
                        onUpdateState={(key, value) => handleUpdateState(key, value)}
                        value={bunny.location}
                        isCreating={isCreating}
                        serverlocation={serverlocation}
                    />
                )}
                {step === 3 && (
                    <BunnyPrint
                        serverurl={serverurl}
                        onNextClicked={handleFinishClicked}
                        bunnyId={bunny.bunnyId}
                        colour={bunny.colour}
                        name={bunny.name}
                    />
                )}
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
