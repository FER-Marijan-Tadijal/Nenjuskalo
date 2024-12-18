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
const categories = [
    { name: "Auto-Moto nautika", id: 0 },
    { name: "Oprema", id: 1 },
    { name: "Odjeca", id: 2 },
    { name: "Obuca", id: 3 },
];
const conditions = [
    { name: "new", id: 0 },
    { name: "used", id: 1 },
    { name: "old", id: 2 },
];
const orders = ["lowestPrice", "highestPrice", "Newest", "Oldest"];

type Item = {
    itemid: string;
    title: string;
    description: string;
    category: string;
    askingprice: string;
    sellerid: string;
    buyerid?: string;
    condition: ["new", "used"];
};
type Seller = {
    sellerId: string;
    name: string;
    surname: string;
    email: string;
    googleId: string;
    password?: string;
    country?: string;
    city?: string;
    street?: string;
    houseNo?: string;
    registerTime: string;
    role: string;
};
type ExplorePageProps = {
    searchProp: string;
};

const Explore = ({ searchProp }: ExplorePageProps) => {
    var q = searchProp;
    q = "Kuc";
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [items, setItems] = useState<Item[]>([]);
    const [randomItems, setRandomItems] = useState<Item[]>([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [conditionId, setConditionId] = useState("");
    const [orderBy, setorderBy] = useState("");
    const [priceChanged, setPriceChanged] = useState(false);

    const fetchRandomItems = async () => {
        const randoms = await fetch("http://localhost:3000/api/random?n=5");
        const randomData = await randoms.json();
        setRandomItems(randomData);
    };

    const fetchItems = async (currentPage: number) => {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (currentPage) params.set("page", currentPage.toString());
        if (categoryId) params.set("categoryId", categoryId);
        if (conditionId) params.set("conditionId", conditionId);
        if (orderBy) params.set("orderBy", orderBy);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        console.log(params);
        const res = await fetch(`http://localhost:3000/api/search?${params}`);
        //const res = await fetch(
        //    `http://localhost:3000/api/search?q=Ku&page=1&orderBy=newest&minPrice=0&maxPrice=20000000`
        //);
        const data = await res.json();
        setItems(data);
        setTotalPages(data.totalPages);
    };

    useEffect(() => {
        fetchItems(page);
        fetchRandomItems();
    }, [page, categoryId, priceChanged, conditionId, orderBy]);

    const handleCategoryIdChange = (event: SelectChangeEvent<string>) => {
        setCategoryId(event.target.value);
    };

    const handleConditionIdChange = (event: SelectChangeEvent<string>) => {
        setConditionId(event.target.value);
    };

    const handleOrderByChange = (event: SelectChangeEvent<string>) => {
        setorderBy(event.target.value);
    };

    const handleLowPriceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMinPrice(event.target.value);
    };
    const handleLowPriceBlur = () => {
        setPriceChanged(!priceChanged);
    };
    const handleHighPriceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMaxPrice(event.target.value);
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
                                    value={conditionId}
                                    onChange={handleConditionIdChange}
                                >
                                    <MenuItem value={""}>
                                        -All Conditions-
                                    </MenuItem>
                                    {conditions.map((condition, index) => (
                                        <MenuItem
                                            key={index}
                                            value={condition.id}
                                        >
                                            {condition.name}
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
                                    value={categoryId}
                                    onChange={handleCategoryIdChange}
                                >
                                    <MenuItem value={""}>
                                        -All Categories-
                                    </MenuItem>
                                    {categories.map((cat, index) => (
                                        <MenuItem key={index} value={cat.id}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: theme.palette.secondary.main,
                                mt: 2,
                                mb: 1,
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
                                    value={minPrice}
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
                                    value={maxPrice}
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
                                        value={orderBy}
                                        onChange={handleOrderByChange}
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
                                price={e.askingprice}
                                sellerId={e.sellerid}
                                category={e.category}
                                key={key}
                            />
                        ))}
                    </Container>
                    <Box
                        sx={{
                            backgroundColor: theme.palette.secondary.main,
                            //position: "fixed",
                            //top: 0,
                            //right: 0,
                            mr: 0,
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
                                        href={`/item/${item.itemid}`}
                                        sx={{
                                            textDecoration: "none",
                                            //color: "#1C2B36",
                                        }}
                                    >
                                        {item.title} - {item.askingprice} €
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
