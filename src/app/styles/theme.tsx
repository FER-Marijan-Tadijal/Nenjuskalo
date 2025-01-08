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
        green: {
            main: "#D4EDDA", // Success color
        },
        red: {
            main: "#d95763", // Failure color
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
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "accentBtn" },
                    style: {
                        mt: 2,
                        backgroundColor: "#FFC300",
                        color: "#003049",
                        fontWeight: "600",
                        "&:hover": {
                            backgroundColor: "#E5A800",
                        },
                    },
                },
                {
                    props: { variant: "categoryBtn" },
                    style: {
                        width: "100%",
                        height: "80px",
                        borderRadius: "16px",
                        fontSize: "1rem",
                        fontWeight: "600",
                        fontFamily: "'Poppins', sans-serif",
                        color: "white",
                        backgroundColor: "#003049",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                        "&:hover": {
                            backgroundColor: "#1c4a6e",
                            transform: "scale(1.05)",
                            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
                        },
                        transition: "transform 0.2s ease-in-out",
                    },
                },
            ],
        },
    },
});

export default theme;
