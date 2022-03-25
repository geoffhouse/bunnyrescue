import { createTheme } from "@mui/material/styles";
const theme = createTheme({
    components: {
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    "& .MuiBottomNavigationAction-root.Mui-selected": {
                        color: "red",
                    },
                },
            },
        },
    },
    palette: {
        primary: { main: "#a80a10" },
        secondary: { main: "#000000" },
    },
});
export default theme;
