"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Grid,
} from "@mui/material";
import { HandleNewAdButton } from "@/app/functions/handleNewAdButton";
import { redirect, RedirectType } from "next/navigation";

export default function NewAdButton() {
    const clientAction = async (formData: FormData) => {
        let newAdId = await HandleNewAdButton(formData);
        redirect(`/editAd/${newAdId}`);
    };

    return (
        <form action={clientAction}>
        {/* Submit Button */}
            <Button
                variant="contained"
                type="submit"
                sx={{
                    mb: 3,
                    bgcolor: "#003049",
                    color: "#FFC300",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    "&:hover": {
                        bgcolor: "#1C4A6E",
                    },
                }}
            >
                Napravi Novi Oglas
            </Button>
        </form>
        
    );
}
