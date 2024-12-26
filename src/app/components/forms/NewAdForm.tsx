"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Box, Button, TextField, MenuItem, Typography, Select, FormControl, InputLabel, Grid } from "@mui/material";
import { HandleNewAdForm } from "@/app/functions/handleNewAdForm";

type Category = {
    id: number;
    name: string;
};
type Condition = {
    id: number;
    name: string;
};

const newAdSchema = z.object({
    title: z.string().trim()
        .min(3, { message: "Naziv mora sadržavati barem 3 znaka." })
        .max(30, { message: "Naziv mora imati 30 znakova ili manje." }),
    description: z.string().trim()
        .min(10, { message: "Opis mora sadržavati barem 10 znakova." })
        .max(1000, { message: "Opis mora imati 1000 znakova ili manje." }),
    askingprice: z.number().nonnegative({ message: "Cijena mora biti pozitivna." }),
});

export default function NewAdForm() {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [conditions, setConditions] = useState<Condition[]>([]);

    const getCategories = async () => {
        try {
            const response = await fetch("/api/categories", { method: "GET" });
            const categories = await response.json();
            setCategories(categories);
        } catch (error) {
            console.error(error);
        }
    };

    const getConditions = async () => {
        try {
            const response = await fetch("/api/conditions", { method: "GET" });
            const conditions = await response.json();
            setConditions(conditions);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCategories();
        getConditions();
    }, []);

    const clientAction = async (formData: FormData) => {
        const newAd = {
            title: formData.get("title"),
            description: formData.get("description"),
            askingprice: parseInt(formData.get("askingprice") as string),
        };

        const result = newAdSchema.safeParse(newAd);
        if (!result.success) {
            const errors = result.error.issues
                .map((issue) => `${issue.path[0]}: ${issue.message}`)
                .join(". ");
            setErrorMessage(errors);
            return;
        }

        setErrorMessage("Uspješno ste poslali oglas!");
        await HandleNewAdForm(formData);
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
                Kreirajte Novi Oglas
            </Typography>

            <form action={clientAction}>
                <Grid container spacing={2}>
                    {/* Title */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Naziv Artikla"
                            name="title"
                            variant="outlined"
                            sx={{ backgroundColor: "white" }}
                        />
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Opis Artikla"
                            name="description"
                            variant="outlined"
                            multiline
                            rows={4}
                            sx={{ backgroundColor: "white" }}
                        />
                    </Grid>

                    {/* Price */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            type="number"
                            label="Cijena Artikla"
                            name="askingprice"
                            variant="outlined"
                            sx={{ backgroundColor: "white" }}
                            onInput={(e) => {
                                const input = e.target as HTMLInputElement;
                                if (parseInt(input.value) < 0) {
                                    input.value = "0";
                                }
                            }}
                        />
                    </Grid>

                    {/* Category */}
                    <Grid item xs={12}>
                        <FormControl fullWidth required variant="outlined">
                            <InputLabel>Kategorija</InputLabel>
                            <Select
                                name="category"
                                defaultValue=""
                                label="Kategorija"
                                sx={{ backgroundColor: "white" }}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Condition */}
                    <Grid item xs={12}>
                        <FormControl fullWidth required variant="outlined">
                            <InputLabel>Stanje Artikla</InputLabel>
                            <Select
                                name="condition"
                                defaultValue=""
                                label="Stanje Artikla"
                                sx={{ backgroundColor: "white" }}
                            >
                                {conditions.map((condition) => (
                                    <MenuItem key={condition.id} value={condition.id}>
                                        {condition.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Error Message */}
                    {errorMessage && (
                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    color: errorMessage === "Uspješno ste poslali oglas!" ? "green" : "red",
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
                            Pošalji Oglas
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}