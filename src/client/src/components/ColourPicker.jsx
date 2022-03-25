import React from "react";
import { CirclePicker } from "react-color";
import Box from "@mui/material/Box";

const colours = {
    natural: "#ecd3a3",
    red: "#ff0000",
    orange: "#ff6600",
    yellow: "#ffd42a",
    green: "#2aff2a",
    turquoise: "#00ffcc",
    blue: "#00ccff",
    purple: "#9955ff",
};

export default function ColourPicker({ value, onChange }) {
    const [localValue, setLocalValue] = React.useState(value);

    const handleColourChanged = (color) => {
        let colourName = "original";

        for (const i in colours) {
            if (colours[i] === color.hex) {
                colourName = i;
            }
        }

        setLocalValue(colourName);
        onChange(colourName);
    };

    const colourArray = [];

    for (const i in colours) {
        colourArray.push(colours[i]);
    }

    // default value
    let selectedHex = colours[localValue];
    const bunnyFilename = `/bunnies/bunny-${localValue}.svg`;

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <Box sx={{ width: "12rem" }}>
                <CirclePicker
                    color={selectedHex}
                    width="200"
                    circleSize={30}
                    colors={colourArray}
                    onChangeComplete={handleColourChanged}
                />
            </Box>
            <Box sx={{ margin: "0 2rem" }}>
                <img alt="Coloured bunny" src={bunnyFilename} style={{ width: "4rem" }}></img>
            </Box>
        </Box>
    );
}
