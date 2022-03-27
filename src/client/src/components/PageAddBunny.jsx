import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import BunnyName from "./BunnyName";
import BunnyLocation from "./BunnyLocation";
import BunnyStepper from "./BunnyStepper";
import BunnyPrint from "./BunnyPrint";
import ContentWrapper from "./ContentWrapper";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function PageAddBunny({ user, serverurl, servername, serverlocation, times }) {
    const history = useHistory();
    const [step, setStep] = React.useState(0);
    const [isCreating, setIsCreating] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const [bunny, setBunny] = React.useState({
        name: "",
        colour: "natural",
        location: null,
        bunnyId: null,
    });

    const handleUpdateState = (key, value) => {
        setBunny({ ...bunny, [key]: value });
    };

    const handleFinishClicked = () => {
        history.push(`/`);
    };

    const createBunny = async () => {
        setIsCreating(true);

        const url = "/api/bunny/create/";

        const postData = {
            name: bunny.name,
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
            if (result.status === "success") {
                const bunnyId = result.data;
                if (bunnyId !== null) {
                    setBunny({ ...bunny, bunnyId: bunnyId });
                    setStep(2);
                } else {
                    enqueueSnackbar("Failed to create bunny", {
                        variant: "error",
                    });
                }
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
                <BunnyStepper step={step} const steps={["Customise", "Location", "Print Code"]}></BunnyStepper>
                {step === 0 && (
                    <BunnyName
                        onNextClicked={() => setStep(1)}
                        onUpdateState={(key, value) => handleUpdateState(key, value)}
                        name={bunny.name}
                        colour={bunny.colour}
                    />
                )}
                {step === 1 && (
                    <BunnyLocation
                        onBackClicked={() => setStep(0)}
                        onNextClicked={createBunny}
                        onUpdateState={(key, value) => handleUpdateState(key, value)}
                        value={bunny.location}
                        isCreating={isCreating}
                        serverlocation={serverlocation}
                    />
                )}
                {step === 2 && (
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
