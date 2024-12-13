"use client";
import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Container,
    Typography,
    FormControl,
    InputLabel,
    Menu,
    MenuItem,
    OutlinedInput,
    InputAdornment,
    FormHelperText,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import ExploreItem from "../components/ExploreComponents/ExploreItem";
import theme from "../styles/theme";
import Link from "next/link";

const exploreItems = [
    {
        title: "Mercedes Benz S-class 2020",
        price: 98000,
        city: "Zagreb",
        street: "Donji Dupci",
        category: "Auto-Moto nautika",
    },
    {
        title: "Mercedes Benz S-class 2020",
        price: 123,
        city: "Zagreb",
        street: "Donji Dupci",
        category: "Oprema",
    },
    {
        title: "Mercedes Benz S-class 2020",
        price: 10,
        city: "Zagreb",
        street: "Donji Dupci",
        category: "Oprema",
    },
    {
        title: "Mercedes Benz S-class 2020",
        price: 2003,
        city: "Zagreb",
        street: "Donji Dupci",
        category: "luxury cars",
    },
];
const search = "Mercedes car";
const categories = ["Auto-Moto nautika", "Oprema", "Odjeca", "Obuca"];

const Explore = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchItems = async (currentPage: number) => {
        const res = await fetch(
            `http://localhost:3000/api/items?page=${currentPage}`
        );
        const data = await res.json();
        setItems(data.data);
        setTotalPages(data.totalPages);
    };

    const [items, setItems] = useState(exploreItems);
    const [lowestPrice, setLowPrice] = useState("");
    const [highestPrice, setHighPrice] = useState("");
    const [category, setCategory] = useState("");
    const [priceChanged, setPriceChanged] = useState(false);
    const [priceCheck, setPriceCheck] = useState(true); //additional variable for checking if price has changed
    var changingItems = exploreItems;

    useEffect(() => {
        changingItems = exploreItems;
        if (category != "") {
            if (category != "-All Categories-") {
                setItems(
                    changingItems.filter((item) => item.category == category)
                );
                changingItems = items;
            } else {
                setItems(exploreItems);
            }
        }

        if (priceCheck == priceChanged) {
            //NE RADI KAKO TREBA
            if (lowestPrice != "") {
                setItems(
                    changingItems.filter(
                        (item) => item.price >= parseInt(lowestPrice)
                    )
                );
                setPriceCheck(!priceCheck);
                changingItems = items;
            }
        }
        if (priceCheck == priceChanged) {
            //NE RADI KAKO TREBA
            if (highestPrice != "") {
                setItems(
                    changingItems.filter(
                        (item) => item.price <= parseInt(highestPrice)
                    )
                );
                setPriceCheck(!priceCheck);
                changingItems = items;
            }
        }
    }, [category, priceChanged]);

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setCategory(event.target.value);
    };

    const handleLowPriceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLowPrice(event.target.value);
    };
    const handleLowPriceBlur = () => {
        setPriceChanged(!priceChanged);
    };

    const handleHighPriceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setHighPrice(event.target.value);
    };
    const handleHighPriceBlur = () => {
        setPriceChanged(!priceChanged);
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                }}
            >
                <Box>
                    <Box
                        sx={{
                            backgroundColor: theme.palette.secondary.main,
                            mt: 10,
                            padding: 2,
                            width: "300px",
                            borderRadius: 2,
                        }}
                    >
                        <Typography sx={{ marginBottom: 2 }} variant="h5">
                            Filter by specific category:
                        </Typography>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="select-label">
                                Choose Category
                            </InputLabel>
                            <Select
                                labelId="select-label"
                                value={category}
                                onChange={handleCategoryChange}
                            >
                                <MenuItem value={"-All Categories-"}>
                                    -All Categories-
                                </MenuItem>
                                {categories.map((cat, index) => (
                                    <MenuItem key={index} value={cat}>
                                        {cat}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: theme.palette.secondary.main,
                            mt: 2,
                            padding: 2,
                            width: "300px",
                            borderRadius: 2,
                        }}
                    >
                        <Typography sx={{ marginBottom: 2 }} variant="h5">
                            Filter by price range:
                        </Typography>
                        <FormControl
                            sx={{ m: 1, width: "25ch" }}
                            variant="outlined"
                        >
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                value={lowestPrice}
                                onChange={handleLowPriceChange}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        handleLowPriceBlur(); // Call your existing function or a custom one
                                        event.preventDefault(); // Optional: Prevents form submission if inside a form
                                    }
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        €
                                    </InputAdornment>
                                }
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    "aria-label": "weight",
                                }}
                            />
                            <FormHelperText id="outlined-weight-helper-text">
                                Lowest Price
                            </FormHelperText>
                        </FormControl>
                        <FormControl
                            sx={{ m: 1, width: "25ch" }}
                            variant="outlined"
                        >
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                value={highestPrice}
                                onChange={handleHighPriceChange}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        handleHighPriceBlur(); // Call your existing function or a custom one
                                        event.preventDefault(); // Optional: Prevents form submission if inside a form
                                    }
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        €
                                    </InputAdornment>
                                }
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    "aria-label": "weight",
                                }}
                            />
                            <FormHelperText id="outlined-weight-helper-text">
                                Highest Price
                            </FormHelperText>
                        </FormControl>
                    </Box>
                </Box>
                <Container
                    sx={{
                        width: "1000px",
                        //backgroundColor: "#D9F0FF ",
                        //color: "#F1E9DA",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: 8,
                        paddingBottom: 1,
                    }}
                >
                    <Box
                        sx={{
                            marginTop: 2,
                            marginBottom: 1,
                            padding: 1,
                            backgroundColor: "#D9F0FF ",
                            color: "#1C2B36",
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6">
                            {" "}
                            Search results for: "{search}"
                        </Typography>
                    </Box>
                    <Box sx={{ border: "1px solid grey" }}>
                        <Button
                            onClick={() =>
                                setPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <span>
                            Page {page} of {totalPages}
                        </span>
                        <Button
                            onClick={() =>
                                setPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                )
                            }
                            disabled={page === totalPages}
                        >
                            Next
                        </Button>
                    </Box>
                    {items.map((e, key) => (
                        <ExploreItem
                            title={e.title}
                            price={e.price}
                            city={e.city}
                            street={e.street}
                            category={e.category}
                            key={key}
                        />
                    ))}
                </Container>
                <Box
                    sx={{
                        backgroundColor: theme.palette.secondary.main,
                        mt: 10,
                        padding: 2,
                        width: "300px",
                        borderRadius: 2,
                    }}
                >
                    <Typography sx={{ marginBottom: 2 }} variant="h5">
                        Relevant Products:
                    </Typography>
                    <Box>
                        {exploreItems.map((item, index) => (
                            <Box
                                sx={{
                                    margin: 0.5,
                                    padding: 1,
                                    border: "1px solid grey",
                                    borderRadius: 1.5,
                                    marginBottom: "auto",
                                    transition: "background-color 0.3s ease",
                                    "&:hover": {
                                        backgroundColor:
                                            theme.palette.cardHover.main,
                                    },
                                }}
                                key={index}
                            >
                                <Typography
                                    component="a"
                                    href={`/items/${item.title}`} // PROMIJENI U item.id
                                    sx={{
                                        textDecoration: "none",
                                        //color: "#1C2B36",
                                    }}
                                >
                                    {item.title} - {item.price} €
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Explore;
