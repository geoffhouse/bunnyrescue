import React from "react";
import RegisterEmail from "./RegisterEmail";
import RegisterTerms from "./RegisterTerms";
import RegisterEnterCode from "./RegisterEnterCode";
import { useParams } from "react-router-dom";

export default function PageRegister({ servername }) {
    const [step, setStep] = React.useState(0);
    const params = useParams();

    React.useEffect(() => {
        if (params.code) {
            setStep(1);
        }
    }, [params]);

    const [state, setState] = React.useState({
        email: params.email ? params.email : "",
        id: "",
        key: "",
        username: "",
    });

    const handleUpdateState = (props) => {
        setState({ ...state, ...props });
    };

    if (step === 0) {
        return <RegisterEmail onNextClicked={() => setStep(1)} onUpdateState={handleUpdateState} value={state.email} />;
    }
    if (step === 1) {
        return (
            <RegisterEnterCode
                onBackClicked={() => setStep(0)}
                onNextClicked={() => setStep(2)}
                onUpdateState={handleUpdateState}
                email={state?.email}
                code={params?.code}
            />
        );
    }
    if (step === 2) {
        return <RegisterTerms onBackClicked={() => setStep(0)} servername={servername} />;
    }
    return null;
}
