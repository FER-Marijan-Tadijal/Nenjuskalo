"use client";
import React from "react";
import { Box, Typography, Button, ThemeProvider } from "@mui/material";
import Link from "next/link";
import theme from "../styles/theme";

const NotFoundPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    marginTop: 10,
                    height: "70vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: theme.palette.secondary.main,
                        padding: 3,
                        borderRadius: 2,
                    }}
                >
                    <Typography component="span" variant="h5">
                        Oops, something went wrong!
                    </Typography>
                    <Typography component="span" variant="h5">
                        -Page not found-{" "}
                    </Typography>
                    <Button
                        variant="accentBtn"
                        href="/"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Return to home page
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default NotFoundPage;
