"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
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
    RadioGroup,
    FormControlLabel,
    Radio,
    Autocomplete,
} from "@mui/material";
import { HandleEditAdForm } from "@/app/functions/handleEditAdForm";
import { HandleDeletePictureForm } from "@/app/functions/handleDeletePictureForm";
import { HandleNewPictureForm } from "@/app/functions/handleNewPictureForm";
import { category, condition, item, itemchangestate } from "@prisma/client";
import { stateEnum } from "@/app/enums/stateEnum";
import { useRouter } from "next/navigation";

type Category = category;

type Condition = condition;

type BigItem = {
    item: item;
    categories: category[];
    state: itemchangestate;
    noOfPictures: number;
};

const newAdSchema = z.object({
    title: z
        .string()
        .trim()
        .min(2, { message: "Naziv mora sadržavati barem 2 znaka" })
        .max(50, { message: "Naziv mora imati 50 znakova ili manje" }),
    description: z
        .string()
        .trim()
        .max(1000, { message: "Opis mora imati 1000 znakova ili manje" }),
    askingprice: z
        .number({ message: "Morate upisati cijenu" })
        .nonnegative({ message: "Cijena mora biti pozitivna" }),
});

const picIndexes = [0, 1, 2, 3, 4, 5]; // This should be an array of however many max pictures we want because React no like for loops

export default function EditAdForm({ id }: { id: number }) {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [conditions, setConditions] = useState<Condition[]>([]);
    const [item, setItem] = useState<BigItem>();
    const router = useRouter();

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
            const response = await fetch(`/api/getItem?id=${id}`, {
                cache: "no-store",
            });
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
        if (!result.success && state == "publish") {
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
        const picturesHolder = document.getElementById(
            "imgupload"
        ) as HTMLInputElement;
        if (picturesHolder.files == null) {
            setErrorMessage("Niste odabrali sliku!");
            return;
        }
        const picture = picturesHolder.files[0];

        await clientAction(formData);

        formData.append("picture", picture);
        await HandleNewPictureForm(formData);

        const response = await fetch(`/api/getItem?id=${id}`, {
            cache: "no-store",
        });
        const myItem = await response.json();
        setItem(myItem);

        router.refresh();
    };

    const deletePicture = async (formData: FormData, index: number) => {
        await clientAction(formData);

        formData.append("index", index.toString());
        await HandleDeletePictureForm(formData);

        const response = await fetch(`/api/getItem?id=${id}`, {
            cache: "no-store",
        });
        const myItem = await response.json();
        setItem(myItem);
        router.refresh();
    };

    if (!item) {
        return <h1>Loading! (or nonexistant item)</h1>;
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
                    <input type="hidden" required name="id" defaultValue={id} />
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
                            inputProps={{
                                inputMode: "decimal",
                                step: "0.01",
                                min: "0",
                            }}
                            defaultValue={item?.item.askingprice}
                            sx={{ backgroundColor: "white" }}
                        />
                    </Grid>

                    {/* Category */}
                    <Grid item xs={12}>
                        <input
                            type="hidden"
                            id="category"
                            name="category"
                            defaultValue={JSON.stringify(item.categories)}
                        />
                        <FormControl fullWidth variant="outlined">
                            <Autocomplete
                                multiple
                                limitTags={3}
                                id="categorySelector"
                                options={categories}
                                getOptionLabel={(category) => category.name}
                                defaultValue={item.categories}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Kategorije"
                                        placeholder="Kategorije"
                                    />
                                )}
                                onChange={(event, value) => {
                                    // This will synchronize the autocomplete value with a hidden input
                                    const hiddenInput =
                                        document.getElementById("category");
                                    if (hiddenInput)
                                        (
                                            hiddenInput as HTMLInputElement
                                        ).value = JSON.stringify(value);
                                }}
                                sx={{ width: "500px" }}
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
                                    <MenuItem
                                        key={condition.id}
                                        value={condition.id}
                                    >
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
                                    color:
                                        errorMessage ===
                                        "Uspješno ste ažurirali oglas!"
                                            ? "green"
                                            : "red",
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

                            {/* Input 
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
                            /> */}

                            {picIndexes.map((name) => {
                                if (name < item.noOfPictures) {
                                    return (
                                        <span key={"group" + name}>
                                            <img
                                                key={"img" + name}
                                                src={
                                                    "/api/image?id=" +
                                                    id +
                                                    "&index=" +
                                                    name +
                                                    "&cachebreaker" +
                                                    new Date().toString()
                                                }
                                                width="100"
                                            />
                                            <input
                                                key={"deletepic" + name}
                                                type="submit"
                                                value="Izbriši"
                                                formAction={(e) =>
                                                    deletePicture(e, name)
                                                }
                                            />
                                        </span>
                                    );
                                } else if (name == item.noOfPictures) {
                                    return (
                                        <span key={"group" + name}>
                                            <input
                                                key={"imgupload"}
                                                id="imgupload"
                                                type="file"
                                                accept="image/*"
                                            />
                                            <input
                                                key={"submit" + name}
                                                type="submit"
                                                value="postavi sliku"
                                                formAction={uploadPicture}
                                            />
                                        </span>
                                    );
                                }
                            })}

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
                                    defaultValue={stateEnum[item.state.stateid]}
                                    name="state"
                                    sx={{
                                        width: "100%", // Ensures full width
                                        color: "white",
                                    }}
                                >
                                    <FormControlLabel
                                        value="active"
                                        control={
                                            <Radio
                                                sx={{
                                                    color: "#FFC300",
                                                    "&.Mui-checked": {
                                                        color: "#FFC300",
                                                    },
                                                }}
                                            />
                                        }
                                        label="Objavi"
                                        sx={{ color: "white" }}
                                    />
                                    <FormControlLabel
                                        value="draft"
                                        control={
                                            <Radio
                                                sx={{
                                                    color: "#FFC300",
                                                    "&.Mui-checked": {
                                                        color: "#FFC300",
                                                    },
                                                }}
                                            />
                                        }
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
