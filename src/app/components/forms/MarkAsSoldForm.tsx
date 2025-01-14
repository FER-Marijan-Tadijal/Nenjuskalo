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
import { HandleMarkAsSoldForm } from "@/app/functions/handleMarkAsSoldForm";
import { redirect, RedirectType } from "next/navigation";
import theme from "@/app/styles/theme";

export default function NewAdForm({ id }: { id: number }) {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const clientAction = async (formData: FormData) => {
        const deleteAd = {
            title: formData.get("id"),
        };

        await HandleMarkAsSoldForm(formData);
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
                    backgroundColor: "#2ecc71",
                    mt: 1,
                    color: "#EEE",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    "&:hover": {
                        backgroundColor: "#27ae60",
                    },
                }}
            >
                Označi kao Prodano
            </Button>
        </form>
    );
}
