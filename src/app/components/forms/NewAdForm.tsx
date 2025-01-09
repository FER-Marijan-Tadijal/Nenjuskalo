"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Box, Button, TextField, MenuItem, Typography, Select, FormControl, InputLabel, Grid, Input, RadioGroup, FormControlLabel, Radio } from "@mui/material";
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
    const states = ["Skica", "Objavi"]

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

        const picturesHolder = document.getElementById("pictures"); // Replace with your HTML element ID
        const picture = (picturesHolder as HTMLInputElement)?.files[0];

        //const newFormData = new FormData()
        formData.append("picture", picture);

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
                            inputProps={{
                                step: "0.01", // Allows decimal values
                                min: "0", // Prevents negative values
                            }}
                            onInput={(e) => {
                                const input = e.target as HTMLInputElement;
                                let value = parseFloat(input.value);
                                if (value < 0) {
                                    value = 0;
                                }
                                input.value = value.toFixed(2);
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

                    {/* Pictures */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                p: 2,
                                backgroundColor: "#003049", // Dark blue background
                                borderRadius: "8px", // Rounded corners
                                border: "2px solid #003049", // Matches the app theme
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                height: "70%",
                            }}
                        >
                            {/* Label for Input */}
                            <label
                                htmlFor="pictures"
                                style={{
                                    display: "inline-block",
                                    padding: "10px 20px",
                                    backgroundColor: "#FFC300", // Golden yellow background
                                    color: "#003049", // Dark blue text
                                    fontWeight: "bold",
                                    borderRadius: "8px", // Rounded corners for the button
                                    cursor: "pointer",
                                    fontFamily: "'Poppins', sans-serif",
                                    textAlign: "center",
                                    marginBottom: "8px",
                                }}
                            >
                                Izaberi Slike
                            </label>

                            {/* Input */}
                            <input
                                type="file"
                                accept="image/*"
                                id="pictures"
                                multiple
                                onChange={(e) => {
                                    const files = e.target.files;
                                    const filenames = Array.from(files || []).map((file) => file.name);
                                    const displayText = filenames.length
                                        ? `${filenames.join(", ")}`
                                        : "Nijedan file nije izabran.";
                                    const displayElement = document.getElementById("file-display");
                                    if (displayElement) displayElement.textContent = displayText;
                                }}
                                style={{
                                    display: "none", 
                                    padding: "10px",
                                    borderRadius: "8px",
                                    width: "100%",
                                    backgroundColor: "white", 
                                    border: "1px solid #E5E5E5", 
                                    fontFamily: "'Roboto', sans-serif",
                                    fontSize: "0.9rem",
                                    color: "#333",
                                }}
                            />

                            {/* Display Selected Files */}
                            <Typography
                                id="file-display"
                                sx={{
                                    fontFamily: "'Roboto', sans-serif",
                                    fontSize: "0.9rem",
                                    color: "white",
                                    textAlign: "center",
                                }}
                            >
                                Nijedan file nije izabran.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* State */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                p: 2,
                                backgroundColor: "#003049", // Dark blue background
                                borderRadius: "8px", // Rounded corners
                                border: "2px solid #003049", // Matches the app theme
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="state"
                                    defaultValue="publish"
                                    name="state"
                                    sx={{ 
                                        width: "100%", // Ensures full width
                                        color: "white" 
                                    }}
                                >
                                    <FormControlLabel 
                                        value="publish" 
                                        control={<Radio sx={{ color: "#FFC300", '&.Mui-checked': { color: "#FFC300" } }} />} 
                                        label="Objavi" 
                                        sx={{ color: "white" }} 
                                    />
                                    <FormControlLabel 
                                        value="draft" 
                                        control={<Radio sx={{ color: "#FFC300", '&.Mui-checked': { color: "#FFC300" } }} />} 
                                        label="Spremi kao Skicu" 
                                        sx={{ color: "white" }} 
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>
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