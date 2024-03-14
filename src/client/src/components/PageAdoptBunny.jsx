import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import BunnyName from "./BunnyName";
import BunnyLocation from "./BunnyLocation";
import BunnyStepper from "./BunnyStepper";
import BunnyAdoptDone from "./BunnyAdoptDone";
import ContentWrapper from "./ContentWrapper";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

export default function PageAdopt({ user, serverurl, servername, serverlocation, times }) {
    const history = useHistory();
    const params = useParams();
    const [step, setStep] = React.useState(0);
    const [isCreating, setIsCreating] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const [bunny, setBunny] = React.useState({
        _id: params.bunnyid,
        name: "",
        colour: "natural",
        location: null,
    });

    const handleUpdateState = (key, value) => {
        setBunny({ ...bunny, [key]: value });
    };

    const handleFinishClicked = () => {
        history.push(`/`);
    };

    const adoptBunny = async () => {
        setIsCreating(true);

        const url = "/api/bunny/add/";

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
            if (result.status === "success") {
                setStep(2);
            } else {
                enqueueSnackbar("Failed to create bunny", {
                    variant: "error",
                });
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
            <BackBar title="Adopt a Bunny"></BackBar>
            <ContentWrapper
                scrollable
                sx={{
                    paddingBottom: "6rem",
                    padding: "1rem",
                }}
            >
                <BunnyStepper step={step} const steps={["Customise", "Location", "Adopted"]}></BunnyStepper>
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
                        onNextClicked={adoptBunny}
                        onUpdateState={(key, value) => handleUpdateState(key, value)}
                        value={bunny.location}
                        isCreating={isCreating}
                        serverlocation={serverlocation}
                    />
                )}
                {step === 2 && <BunnyAdoptDone onNextClicked={handleFinishClicked} times={times} />}
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
