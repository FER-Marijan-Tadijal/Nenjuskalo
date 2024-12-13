import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import theme from "../styles/theme";

type Props = {};

const NotFoundPage = (props: Props) => {
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
                    Oops, something went wrong!
                </Typography>
                <Typography component="span" variant="h5">
                    -Page not found-{" "}
                </Typography>
                <Button
                    variant="contained"
                    href="/"
                    fullWidth
                    sx={{
                        mt: 2,
                        bgcolor: theme.palette.accent.main,
                        color: theme.palette.primary.main,
                        fontWeight: "600",
                        "&:hover": {
                            bgcolor: theme.palette.buttonHover.main,
                        },
                    }}
                >
                    Return to home page
                </Button>
            </Box>
        </Box>
    );
};

export default NotFoundPage;
