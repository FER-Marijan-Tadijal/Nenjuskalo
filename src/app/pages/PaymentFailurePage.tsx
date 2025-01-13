"use client";
import React from "react";
import { Box, Typography, Button, ThemeProvider } from "@mui/material";
import theme from "../styles/theme";
import ReportIcon from "@mui/icons-material/Report";

type Props = {};

const PaymentFailurePage = (props: Props) => {
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
                className="slide-in-container-05s"
            >
                <Box
                    sx={{
                        width: "450px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: theme.palette.red.main,
                        padding: 3,
                        borderRadius: 2,
                    }}
                >
                    <ReportIcon sx={{ fontSize: "50px" }}></ReportIcon>
                    <Typography component="span" variant="h4">
                        Neuspjelo plaćanje!
                    </Typography>
                    <Typography
                        component="span"
                        variant="h5"
                        textAlign="center"
                    >
                        Vaša kartica je odbijena. Molimo Vas pokušajte
                        transakciju ponovno.
                    </Typography>
                    <Button
                        variant="accentBtn"
                        href="/"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Povratan na oglas
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default PaymentFailurePage;
