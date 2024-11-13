// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ff6b6b", // Light red as the primary color
            light: "#ffa4a4", // Lighter shade of red for hover effects
            contrastText: "#ffffff", // White text on primary elements
        },
        secondary: {
            main: "#fff3b0", // Light yellow as the secondary color
            light: "#fff8d0", // Even lighter yellow for backgrounds/highlights
            contrastText: "#333333", // Dark text on secondary elements
        },
        background: {
            default: "#ffffff", // White background
            paper: "#ffffff", // Paper background is also white for consistency
        },
        text: {
            primary: "#333333", // Dark gray for primary text
            secondary: "#555555", // Medium gray for secondary text
        },
        divider: "#e0e0e0", // Light gray for borders or dividers
    },
    typography: {
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
            styleOverrides: {
                root: {
                    borderRadius: "4px", // Optional: customize button shape
                },
                containedPrimary: {
                    backgroundColor: "#ff6b6b",
                    color: "#ffffff",
                    "&:hover": {
                        backgroundColor: "#ffa4a4",
                    },
                },
                containedSecondary: {
                    backgroundColor: "#fff3b0",
                    color: "#333333",
                    "&:hover": {
                        backgroundColor: "#fff8d0",
                    },
                },
            },
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
