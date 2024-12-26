"use client";
import React from "react";
import { Box, Typography, ThemeProvider, Button } from "@mui/material";
import theme from "@/app/styles/theme";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

type Props = {};

const SignInProp = (props: Props) => {
    return (
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
                    You must be signed in to message other people!
                </Typography>
                <Button
                    variant="contained"
                    startIcon={
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <GoogleIcon />
                            <GitHubIcon />
                        </Box>
                    }
                    sx={{
                        bgcolor: "#FFC300",
                        color: "#003049",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "bold",
                        "&:hover": {
                            bgcolor: "#E5A800",
                        },
                        textTransform: "none",
                        px: 2,
                        mt: 2,
                    }}
                    onClick={() => signIn()}
                >
                    Prijava
                </Button>
            </Box>
        </Box>
    );
};

export default SignInProp;
