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
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    minHeight: "42px",
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: "0.9rem",
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
