"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Box, Button, TextField, MenuItem, Typography, Select, FormControl, InputLabel, Grid, RadioGroup, FormControlLabel, Radio, Autocomplete } from "@mui/material";
import { HandleEditAdForm } from "@/app/functions/handleEditAdForm";
import { HandleDeletePictureForm } from "@/app/functions/handleDeletePictureForm";
import { HandleNewPictureForm } from "@/app/functions/handleNewPictureForm";
import { category, condition, item, itemchangestate } from "@prisma/client";
import { stateEnum } from "@/app/enums/stateEnum";
import { useRouter } from "next/navigation";

type Category = category;

type Condition = condition;

type BigItem = {
    item: item,
    categories: category[],
    state: itemchangestate[],
    noOfPictures: number,
}

const newAdSchema = z.object({
    title: z.string().trim()
        .min(2, { message: "Naziv mora sadržavati barem 2 znaka" })
        .max(50, { message: "Naziv mora imati 50 znakova ili manje" }),
    description: z.string().trim()
        .max(1000, { message: "Opis mora imati 1000 znakova ili manje" }),
    askingprice: z.number({ message: "Morate upisati cijenu"}).nonnegative({ message: "Cijena mora biti pozitivna" }),
});

const picIndexes = [0, 1, 2, 3, 4, 5] // This should be an array of however many max pictures we want because React no like for loops

export default function EditAdForm({id} : {id : number}) {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [conditions, setConditions] = useState<Condition[]>([]);
    const [item, setItem] = useState<BigItem>();
    const router = useRouter()

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

    const getItem = async () => {
        try {
            const response = await fetch(`/api/getItem?id=${id}`, { cache: "no-store"});
            const myItem = await response.json();
            setItem(myItem);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCategories();
        getConditions();
        getItem();
    }, []);

    const clientAction = async (formData: FormData) => {
        const newAd = {
            title: formData.get("title"),
            description: formData.get("description"),
            askingprice: parseFloat(formData.get("askingprice") as string),
        };

        let state = formData.get("state") as string;

        const result = newAdSchema.safeParse(newAd);
        if (!(result.success) && state=="active") {
            const errors = result.error.issues
                .map((issue) => `${issue.path[0]}: ${issue.message}`)
                .join(". ");
            setErrorMessage(errors + "\n ili spremite oglas kao skicu.");
            return;
        }

        setErrorMessage("Uspješno ste ažurirali oglas!");
        await HandleEditAdForm(formData);
    };

    const uploadPicture = async (formData: FormData) => {
        const picturesHolder = document.getElementById("imgupload") as HTMLInputElement;
        if (picturesHolder.files == null) {
            setErrorMessage("Niste odabrali sliku!")
            return
        }
        const picture = picturesHolder.files[0];

        await clientAction(formData);

        formData.append("picture", picture);
        await HandleNewPictureForm(formData);

        const response = await fetch(`/api/getItem?id=${id}`, { cache: "no-store"});
        const myItem = await response.json();
        setItem(myItem);

        router.refresh()
    };

    const deletePicture = async (formData: FormData, index : number) => {
        await clientAction(formData);

        formData.append("index", index.toString());
        await HandleDeletePictureForm(formData);

        const response = await fetch(`/api/getItem?id=${id}`, { cache: "no-store"});
        const myItem = await response.json();
        setItem(myItem);
        router.refresh()
    };

    if (!item) {
        return <h1>Loading! (or nonexistant item)</h1>
    }

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
                Ažurirajte Oglas
            </Typography>

            <form>
                <Grid container spacing={2}>
                    {/* ID */}
                    <input
                        type="hidden"
                        required
                        name="id"
                        defaultValue={id}
                    />
                    {/* Title */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            inputProps={{ maxLength: 50 }}
                            defaultValue={item?.item.title}
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
                            inputProps={{ maxLength: 1000 }}
                            defaultValue={item?.item.description}
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
                            type="number"
                            label="Cijena Artikla"
                            name="askingprice"
                            variant="outlined"
                            inputProps={{ inputMode: "decimal", step: "0.01", min: "0"}}
                            defaultValue={item?.item.askingprice}
                            sx={{ backgroundColor: "white" }}
                        />
                    </Grid>

                    {/* Category */}
                    <Grid item xs={12}>
                        <input type="hidden" id="category" name="category" defaultValue={JSON.stringify(item.categories)}/>
                        <FormControl fullWidth variant="outlined">
                            <Autocomplete
                                multiple
                                limitTags={3}
                                id="categorySelector"
                                options={categories}
                                getOptionLabel={(category) => category.name}
                                defaultValue= {item.categories}
                                renderInput={(params) => (
                                    <TextField {...params} label="Kategorije" placeholder="Kategorije" />
                                )}
                                onChange={(event, value) => {
                                    // This will synchronize the autocomplete value with a hidden input
                                    const hiddenInput = document.getElementById("category");
                                    if (hiddenInput) (hiddenInput as HTMLInputElement).value = JSON.stringify(value);
                                  }}
                                sx={{ width: '500px' }}
                            />
                        </FormControl>
                    </Grid>

                    {/* Condition */}
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Stanje Artikla</InputLabel>
                            <Select
                                name="condition"
                                displayEmpty
                                defaultValue={item.item.conditionid}
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
                                    color: errorMessage === "Uspješno ste ažurirali oglas!" ? "green" : "red",
                                    textAlign: "center",
                                    fontSize: "0.9rem",
                                }}
                            >
                                {errorMessage}
                            </Typography>
                        </Grid>
                    )}

                    {/* Pictures */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                p: 3,
                                backgroundColor: "#003049",
                                borderRadius: "12px",
                                border: "2px solid #FFC300",
                                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                height: "85%",
                            }}
                        >
                            {item.noOfPictures > 0 && (
                                <>
                                    {/* Picture View Section */}
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "#FFC300",
                                            fontFamily: "'Poppins', sans-serif",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                        }}
                                    >
                                        Vaše Slike
                                    </Typography>
                                </>
                            )}

                            <Box
                                sx={{
                                    maxHeight: "150px",  // Ograničenje visine za scroll
                                    overflowY: item.noOfPictures > 1 ? "auto" : "visible",   // Vertikalno scrollanje ako ima više od jedne slike
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    pr: 1,               // Dodaj prostor za scroll bar
                                    "&::-webkit-scrollbar-thumb": {
                                        backgroundColor: "#FFC300",
                                        borderRadius: "10px",
                                    },
                                }}
                            >
                                {picIndexes.map((name) => {
                                    if (name < item.noOfPictures) {
                                        return (
                                            <Box
                                                key={"group" + name}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    gap: 1,
                                                    backgroundColor: "#F5F5F5",
                                                    p: 1,
                                                    borderRadius: "8px",
                                                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                                                }}
                                            >
                                                {/* Slika */}
                                                <img
                                                    key={"img" + name}
                                                    src={`/api/image?id=${id}&index=${name}&cachebreaker=${new Date().toString()}`}
                                                    width="80"
                                                    height="80"
                                                    style={{
                                                        objectFit: "cover",
                                                        borderRadius: "8px",
                                                        border: "2px solid #FFC300",
                                                    }}
                                                    alt={`Slika ${name + 1}`}
                                                />

                                                {/* Gumb za Brisanje */}
                                                <input
                                                    key={"deletepic" + name}
                                                    type="submit"
                                                    value="🗑️ Izbriši"
                                                    formAction={(e) => deletePicture(e, name)}
                                                    style={{
                                                        backgroundColor: "#FF6B6B",
                                                        color: "white",
                                                        border: "none",
                                                        padding: "6px 12px",
                                                        borderRadius: "8px",
                                                        cursor: "pointer",
                                                        fontWeight: "bold",
                                                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                                                        transition: "background-color 0.3s ease",
                                                    }}
                                                    onMouseOver={(e) =>
                                                        (e.currentTarget.style.backgroundColor = "#E63946")
                                                    }
                                                    onMouseOut={(e) =>
                                                        (e.currentTarget.style.backgroundColor = "#FF6B6B")
                                                    }
                                                />
                                            </Box>
                                        );
                                    }
                                })}
                            </Box>

                            {/* 📤 Sekcija za Upload Slike */}
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "#FFC300",
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}
                            >
                                Dodaj Novu Sliku
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 2,
                                    backgroundColor: "#F5F5F5",
                                    p: 2,
                                    borderRadius: "8px",
                                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                {/* Input za Upload Slike */}
                                <input
                                    key={"imgupload"}
                                    id="imgupload"
                                    type="file"
                                    accept="image/*"
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        borderRadius: "8px",
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc",
                                        boxSizing: "border-box",
                                    }}
                                />

                                {/* Gumb za Upload */}
                                <input
                                    key={"submit-upload"}
                                    type="submit"
                                    value="📤 Postavi sliku"
                                    formAction={uploadPicture}
                                    style={{
                                        backgroundColor: "#003049",
                                        color: "#FFC300",
                                        border: "none",
                                        padding: "10px 20px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                                        transition: "background-color 0.3s ease",
                                    }}
                                    onMouseOver={(e) =>
                                        (e.currentTarget.style.backgroundColor = "#1C4A6E")
                                    }
                                    onMouseOut={(e) =>
                                        (e.currentTarget.style.backgroundColor = "#003049")
                                    }
                                />
                            </Box>
                        </Box>
                    </Grid>


                    {/* State */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                p: 2,
                                backgroundColor: "#003049", // Dark blue background
                                borderRadius: "12px", // Rounded corners
                                border: "2px solid #FFC300", // Matches the app theme
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="state"
                                    defaultValue={stateEnum[item.state[0].stateid]}
                                    name="state"
                                    sx={{ 
                                        width: "100%", // Ensures full width
                                        color: "white" 
                                    }}
                                >
                                    <FormControlLabel 
                                        value="active" 
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

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            type="submit"
                            formAction={clientAction}
                            variant="contained"
                            sx={{
                                backgroundColor: "#FFC300",
                                color: "#003049",
                                fontWeight: "bold",
                                fontSize: "1rem",
                                mt: 2, // Added margin-top to move the button down
                                "&:hover": {
                                    backgroundColor: "#E5A800",
                                },
                            }}
                        >
                            Ažurirajte Oglas
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}