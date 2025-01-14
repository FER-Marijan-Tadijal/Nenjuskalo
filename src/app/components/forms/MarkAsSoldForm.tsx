"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, TextField, MenuItem, Typography, Select, FormControl, InputLabel, Grid } from "@mui/material";
import { HandleMarkAsSoldForm } from "@/app/functions/handleMarkAsSoldForm";
import { redirect, RedirectType } from "next/navigation";

export default function NewAdForm({id} : {id : number}) {
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
        <Grid container spacing={2}>
            <input
                type="hidden"
                required
                name="id"
                value={id}
            />
            {/* Submit Button */}
            <Grid item xs={12}>
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: "#00C3FF",
                        color: "#EEE",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        "&:hover": {
                            backgroundColor: "#00A3BB",
                        },
                    }}
                >
                    Označi kao Prodano
                </Button>
            </Grid>
        </Grid>
    </form>
    );
}