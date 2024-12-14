// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#003049", // Dark blue
        },
        secondary: {
            main: "#D9F0FF", // Light blue
        },
        accent: {
            main: "#FFC300", // Yellow for buttons
        },
        /*background: {
            default: "#ffffff",
            paper: "#ffffff",
        },*/
        textBlack: {
            main: "#1C2B36", // Grey for light background
        },
        textWhite: {
            main: "#F1E9DA", // White for dark background
        },
        cardHover: {
            main: "#FAF3E0",
        },
        buttonHover: {
            main: "#E5A800",
        },
        /*text: {
            primary: "#333333", // Dark gray for primary text
            secondary: "#555555", // Medium gray for secondary text
        },
        divider: "#e0e0e0", // Light gray for borders or dividers*/
    },
    typography: {
        //fontove treba popravit
        fontFamily: '"Roboto", sans-serif', // Font for the whole theme
        h1: {
            fontWeight: 600,
            color: "#333333",
        },
        h2: {
            fontWeight: 600,
            color: "#333333",
        },
        body1: {
            fontWeight: 400,
            color: "black",
        },
        body2: {
            fontWeight: 400,
            color: "#555555",
        },
    }, //OVO DOLJE IZGENERIRAO CHAT GPT, TREBA TEK NAPRAVIT/POPRAVIT ZAPRAVO - ignoriraj zasad
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "accentBtn" },
                    style: {
                        border: "1px solid black",
                        mt: 2,
                        bgcolor: "#FFC300",
                        color: "#003049",
                        fontWeight: "600",
                        "&:hover": {
                            bgcolor: "#E5A800",
                        },
                    },
                },
            ],
            /*styleOverrides: {
                root: {
                    mt: 2,
                },
                contained: {
                    bgcolor: "accent.main",
                    color: "primary.main",
                    fontWeight: "600",
                    "&:hover": {
                        bgcolor: "theme.palette.buttonHover.main",
                    },
                },
                containedSecondary: {
                    backgroundColor: "#fff3b0",
                    color: "#333333",
                    "&:hover": {
                        backgroundColor: "#fff8d0",
                    },
                },
            },*/
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: "#ffffff", // White background for input fields
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "#e0e0e0", // Default light gray border
                        },
                        "&:hover fieldset": {
                            borderColor: "#ff6b6b", // Light red border on hover
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#ff6b6b", // Light red border when focused
                        },
                    },
                },
            },
        },
    },
});

export default theme;
