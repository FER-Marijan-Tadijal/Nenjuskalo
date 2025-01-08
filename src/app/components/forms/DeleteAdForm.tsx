"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Box, Button, TextField, MenuItem, Typography, Select, FormControl, InputLabel, Grid } from "@mui/material";
import { HandleNewAdForm } from "@/app/functions/handleNewAdForm";
import { HandleDeleteAdForm } from "@/app/functions/handleDeleteAdForm";

const deleteAdSchema = z.object({
    id: z.number().nonnegative({ message: "Id mora biti pozitivan." }),
});

export default function NewAdForm({id} : {id : number}) {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const clientAction = async (formData: FormData) => {
        const deleteAd = {
            title: formData.get("id"),
        };

        const result = deleteAdSchema.safeParse(deleteAd);
        if (!result.success) {
            const errors = result.error.issues
                .map((issue) => `${issue.path[0]}: ${issue.message}`)
                .join(". ");
            setErrorMessage(errors);
            return;
        }

        setErrorMessage("Uspješno ste izbrisali oglas!");
        await HandleDeleteAdForm(formData);
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

            <form action={clientAction}>
                <Grid container spacing={2}>
                    {/* id. Treba dodati default value id oglasa nekako */}
                    <input
                        type="hidden"
                        required
                        name="id"
                        value={id}
                    />

                    {/* Error Message */}
                    {errorMessage && (
                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    color: errorMessage === "Uspješno ste izbrisali oglas!" ? "green" : "red",
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
                            Izbriši Oglas
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}