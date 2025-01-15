"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    TextField,
    MenuItem,
    Typography,
    Select,
    FormControl,
    InputLabel,
    Grid,
} from "@mui/material";
import { HandleDeleteAdForm } from "@/app/functions/handleDeleteAdForm";
import { redirect, RedirectType } from "next/navigation";
import theme from "@/app/styles/theme";

export default function DeleteAdForm({ id }: { id: number }) {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const clientAction = async (formData: FormData) => {
        const deleteAd = {
            title: formData.get("id"),
        };

        await HandleDeleteAdForm(formData);
        redirect("/profile");
    };

    return (
        <form action={clientAction}>
            <input type="hidden" required name="id" value={id} />

            {/* Submit Button */}
            <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                    backgroundColor: theme.palette.red.main,
                    mt: 1,
                    color: "#003049",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    "&:hover": {
                        backgroundColor: "#D11A0A",
                    },
                }}
            >
                Izbriši Oglas
            </Button>
        </form>
    );
}
