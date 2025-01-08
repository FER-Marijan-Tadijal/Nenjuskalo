"use client";

import React, { useEffect, useState } from "react";

import { z } from "zod";
import { Box, Button, TextField, MenuItem, Typography, Select, FormControl, InputLabel, Grid } from "@mui/material";
import { HandleNewProfileForm } from "@/app/functions/handleNewProfileForm";
import { redirect } from "next/navigation";

const newProfileSchema = z.object({
    country: z.string().trim()
        .max(80, { message: "Naziv države mora imati 30 znakova ili manje." }),
    city: z.string().trim()
        .max(80, { message: "Naziv grada mora imati 80 znakova ili manje." }),
    street: z.string().trim().max(80, { message: "Naziv ulice mora imati 80 znakova ili manje." }),
    houseno: z.string().trim().max(20, { message: "Ulični broj mora imati 20 znakova ili manje." })
});

export default function NewProfileForm({id} : {id : string}) {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const clientAction = async (formData: FormData) => {
        const newProfile = {
            country: formData.get("country"),
            city: formData.get("city"),
            street: formData.get("street"),
            houseno: formData.get("houseno"),
        };

        const result = newProfileSchema.safeParse(newProfile);
        if (!result.success) {
            const errors = result.error.issues
                .map((issue) => `${issue.path[0]}: ${issue.message}`)
                .join(". ");
            setErrorMessage(errors);
            return;
        }

        setErrorMessage("Uspješno ste promijenili profilne podatke!");
        await HandleNewProfileForm(formData);
        redirect("/profile")
    };

    return (
        <Box
            sx={{
                backgroundColor: "#f5f5f5",
                padding: "32px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                maxWidth: "600px",
                margin: "auto",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    color: "#003049",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "bold",
                    mb: 1, // Adjusted margin-bottom
                }}
            >
                Promijenite Podatke Profila
            </Typography>

            <form action={clientAction}>
                <Grid container spacing={2}>
                    {/* Session user id that ought to have a default value inside! */}
                    <input
                            required
                            type="hidden"
                            name="id"
                            value={id}
                        />

                    {/* country */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Država"
                            name="country"
                            variant="outlined"
                            sx={{ backgroundColor: "white" }}
                        />
                    </Grid>

                    {/* city */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Grad"
                            name="city"
                            variant="outlined"
                            sx={{ backgroundColor: "white" }}
                        />
                    </Grid>

                    {/* street */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Ulica"
                            name="street"
                            variant="outlined"
                            sx={{ backgroundColor: "white" }}
                        />
                    </Grid>

                    {/* houseno */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Kućni Broj"
                            name="houseno"
                            variant="outlined"
                            sx={{ backgroundColor: "white" }}
                        />
                    </Grid>

                    {/* Error Message */}
                    {errorMessage && (
                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    color: errorMessage === "Uspješno ste promijenili profilne podatke!" ? "green" : "red",
                                    textAlign: "center",
                                    fontSize: "0.9rem",
                                }}
                            >
                                {errorMessage}
                            </Typography>
                        </Grid>
                    )}

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: "#FFC300",
                                color: "#003049",
                                fontWeight: "bold",
                                fontSize: "1rem",
                                "&:hover": {
                                    backgroundColor: "#E5A800",
                                },
                            }}
                        >
                            Ažuriraj Profil
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}