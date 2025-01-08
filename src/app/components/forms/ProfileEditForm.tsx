"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Box, Button, TextField, Grid, Typography } from "@mui/material";
import { HandleNewProfileForm } from "@/app/functions/handleNewProfileForm";
import { redirect } from "next/navigation";

const newProfileSchema = z.object({
    country: z.string().trim()
        .max(80, { message: "Naziv države mora imati 80 znakova ili manje." }),
    city: z.string().trim()
        .max(80, { message: "Naziv grada mora imati 80 znakova ili manje." }),
    street: z.string().trim()
        .max(80, { message: "Naziv ulice mora imati 80 znakova ili manje." }),
    houseno: z.string().trim().max(20, { message: "Ulični broj mora imati 20 znakova ili manje." })
});

export default function NewProfileForm({ id }: { id: string }) {
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
        redirect("/profile");
    };

    return (
        <Box
            sx={{
                padding: "40px",
                borderRadius: "16px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                maxWidth: "600px",
                margin: "auto",
                border: "3px solid #003049",
                backgroundColor: "#003049",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    color: "#FFC300",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "bold",
                    marginBottom: "24px",
                    textTransform: "uppercase",
                }}
            >
                Ažurirajte Profil
            </Typography>

            <form action={clientAction}>
                <Grid container spacing={3}>
                    {/* Hidden Input for User ID */}
                    <input
                        required
                        type="hidden"
                        name="id"
                        value={id}
                    />

                    {/* Država */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Država"
                            name="country"
                            variant="outlined"
                            sx={{
                                backgroundColor: "white",
                                fontFamily: "'Roboto', sans-serif",
                            }}
                        />
                    </Grid>

                    {/* Grad */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Grad"
                            name="city"
                            variant="outlined"
                            sx={{
                                backgroundColor: "white",
                                fontFamily: "'Roboto', sans-serif",
                            }}
                        />
                    </Grid>

                    {/* Ulica */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Ulica"
                            name="street"
                            variant="outlined"
                            sx={{
                                backgroundColor: "white",
                                fontFamily: "'Roboto', sans-serif",
                            }}
                        />
                    </Grid>

                    {/* Kućni broj */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Kućni Broj"
                            name="houseno"
                            variant="outlined"
                            sx={{
                                backgroundColor: "white",
                                fontFamily: "'Roboto', sans-serif",
                            }}
                        />
                    </Grid>

                    {/* Error Message */}
                    {errorMessage && (
                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    color: errorMessage === "Uspješno ste promijenili profilne podatke!" ? "#28a745" : "#dc3545",
                                    textAlign: "center",
                                    fontFamily: "'Roboto', sans-serif",
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
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: "bold",
                                fontSize: "1rem",
                                textTransform: "uppercase",
                                "&:hover": {
                                    backgroundColor: "#E5A800",
                                },
                            }}
                        >
                            Spremi Promjene
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
