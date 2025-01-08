"use client";

import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton() {
    const handleBackClick = () => {
        window.location.href = "/message"; // Redirect to /messages
    };

    return (
        <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackClick}
            sx={{
                position: "absolute",
                top: "16px",
                left: "16px",
                bgcolor: "#FFC300",
                color: "#003049",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "bold",
                "&:hover": {
                    bgcolor: "#E5A800",
                },
                textTransform: "none",
                px: 2,
            }}
        >
            Povratak
        </Button>
    );
}
