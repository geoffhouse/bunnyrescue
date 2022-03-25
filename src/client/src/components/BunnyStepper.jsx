import React from "react";
import { createTheme } from "@mui/material/styles";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

export default function BunnyStepper({ steps, step }) {
    const theme = createTheme();

    return (
        <Stepper
            sx={{
                [theme.breakpoints.down("xs")]: {
                    padding: "10px 0px",
                },
                backgroundColor: "#f3f3f3",
            }}
            activeStep={step}
            alternativeLabel
        >
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
}
