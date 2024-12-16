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
import { ThemeProvider } from "@mui/material";

const exploreItems = [
    {
        id: 4,
        title: "Mercedes Benz S-class 2020",
        price: 2003,
        city: "Zagreb",
        street: "Donji Dupci",
        category: "luxury cars",
    },
    {
        id: 1,
        title: "Mercedes Benz S-class 2020",
        price: 98000,
        city: "Zagreb",
        street: "Donji Dupci",
        category: "Auto-Moto nautika",
    },
    {
        id: 2,
        title: "Mercedes Benz S-class 2020",
        price: 123,
        city: "Zagreb",
        street: "Donji Dupci",
        category: "Oprema",
    },
    {
        id: 3,
        title: "Mercedes Benz S-class 2020",
        price: 10,
        city: "Zagreb",
        street: "Donji Dupci",
        category: "Oprema",
    },
    {
        id: 4,
        title: "Mercedes Benz S-class 2020",
        price: 2003,
        city: "Zagreb",
        street: "Donji Dupci",
        category: "luxury cars",
    },
    {
        id: 1,
        title: "Mercedes Benz S-class 2020",
        price: 98000,
        city: "Zagreb",
        street: "Donji Dupci",
        category: "Auto-Moto nautika",
    },
    {
        id: 2,
        title: "Mercedes Benz S-class 2020",
        price: 123,
        city: "Zagreb",
        street: "Donji Dupci",
        category: "Oprema",
    },
];
const search = "Mercedes car";
const categories = ["Auto-Moto nautika", "Oprema", "Odjeca", "Obuca"];
const conditions = ["new", "used", "old"];
const orders = ["Lower Price", "Higher price", "Newer post", "Older post"];

const Explore = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [items, setItems] = useState(exploreItems);
    const [randomItems, setRandomItems] = useState(exploreItems); //need function for random items
    const [lowestPrice, setLowPrice] = useState("");
    const [highestPrice, setHighPrice] = useState("");
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [order, setOrder] = useState("");
    const [priceChanged, setPriceChanged] = useState(false);

    const fetchItems = async (currentPage: number) => {
        const params = new URLSearchParams({
            page: currentPage.toString(),
            category,
            condition,
            order,
            lowestPrice,
            highestPrice,
        });

        const res = await fetch(`http://localhost:3000/api/items?${params}`);
        const data = await res.json();
        setItems(data.data);
        setTotalPages(data.totalPages);
    };

    useEffect(() => {
        fetchItems(page);
    }, [page, category, priceChanged, condition, order]);

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setCategory(event.target.value);
    };

    const handleConditionChange = (event: SelectChangeEvent<string>) => {
        setCondition(event.target.value);
    };

    const handleOrderChange = (event: SelectChangeEvent<string>) => {
        setOrder(event.target.value);
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
            <ThemeProvider theme={theme}>
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
                                Filter by condition:
                            </Typography>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="select-label">
                                    Choose condition
                                </InputLabel>
                                <Select
                                    labelId="select-label"
                                    value={condition}
                                    onChange={handleConditionChange}
                                >
                                    <MenuItem value={"-All Conditions-"}>
                                        -All Categories-
                                    </MenuItem>
                                    {conditions.map((condition, index) => (
                                        <MenuItem key={index} value={condition}>
                                            {condition}
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
                                            handleLowPriceBlur();
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
                                            handleHighPriceBlur();
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
                                backgroundColor: theme.palette.secondary.main,
                                color: "#1C2B36",
                                borderRadius: 2,
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h6">
                                {" "}
                                Search results for: "{search}"
                            </Typography>
                            <Box
                                sx={{
                                    backgroundColor:
                                        theme.palette.secondary.main,
                                    padding: 2,
                                    width: "300px",
                                    borderRadius: 2,
                                }}
                            >
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="select-label">
                                        Order by
                                    </InputLabel>
                                    <Select
                                        labelId="select-label"
                                        value={order}
                                        onChange={handleOrderChange}
                                    >
                                        {orders.map((order, index) => (
                                            <MenuItem key={index} value={order}>
                                                {order}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
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
                            <Typography component="span">
                                Page {page} of {totalPages}
                            </Typography>
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
                            {randomItems.map((item, index) => (
                                <Box
                                    sx={{
                                        margin: 0.5,
                                        padding: 1,
                                        border: "1px solid grey",
                                        borderRadius: 1.5,
                                        marginBottom: "auto",
                                        transition:
                                            "background-color 0.3s ease",
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
            </ThemeProvider>
        </>
    );
};

export default Explore;
