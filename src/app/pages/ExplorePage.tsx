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
import ExploreFilter from "../components/ExploreComponents/ExploreFilter";
import theme from "../styles/theme";
import { ThemeProvider } from "@mui/material";
import ExplorePriceRange from "../components/ExploreComponents/ExplorePriceRange";
import ExploreRelevantItems from "../components/ExploreComponents/ExploreRelevantItems";

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
    { name: "novo", id: 0 },
    { name: "rabljeno", id: 1 },
    { name: "osteceno", id: 2 },
];
const orders = ["lowestPrice", "highestPrice", "newest", "oldest"];

type Item = {
    itemid: string;
    title: string;
    description: string;
    belongsto: { categoryid: number }[];
    askingprice: string;
    sellerid: string;
    buyerid?: string;
    conditionid: number;
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
    searchTerm: string;
};

const Explore = ({ searchTerm }: ExplorePageProps) => {
    var q = searchTerm;
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
        //console.log(items[0].belongsto[0].categoryid);
        const randoms = await fetch(
            //`http://localhost:3000/api/getCategory?id=${items[0].belongsto[0].categoryid}`
            `http://localhost:3000/api/random?n=5`
        );
        const randomData = await randoms.json();
        console.log(randomData);
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
        console.log(params.toString());
        const res = await fetch(`http://localhost:3000/api/search?${params}`);
        //const res = await fetch(
        //    `http://localhost:3000/api/search?q=Ku&page=1&orderBy=newest&minPrice=0&maxPrice=20000000`
        //);
        const data = await res.json();
        console.log("Fetched items:", data);

        if (Array.isArray(data)) {
            setItems(data);
        } else {
            console.error("No data matches you search!!!"); //KASNIJE NAPRAVI DA IZBACI TO I KORISNIKU
            setItems([]);
        }
        setTotalPages(data.totalPages);
    };

    useEffect(() => {
        fetchItems(page);
    }, [page, categoryId, priceChanged, conditionId, orderBy]);
    useEffect(() => {
        fetchRandomItems();
    }, []);

    const handleCategoryIdChange = (event: SelectChangeEvent<string>) => {
        setCategoryId(event.target.value);
    };

    const handleConditionIdChange = (event: SelectChangeEvent<string>) => {
        setConditionId(event.target.value);
    };

    const handleOrderByChange = (event: SelectChangeEvent<string>) => {
        setorderBy(event.target.value);
    };

    const handleMinPriceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMinPrice(event.target.value);
    };
    const handleMinPriceBlur = () => {
        setPriceChanged(!priceChanged);
    };
    const handleMaxPriceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMaxPrice(event.target.value);
    };
    const handleMaxPriceBlur = () => {
        setPriceChanged(!priceChanged);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                {items && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "start",
                            mt: 8,
                        }}
                    >
                        <Box>
                            <ExploreFilter
                                filterName="condition"
                                filter={conditionId}
                                onChange={handleConditionIdChange}
                                filterOptions={conditions}
                            />
                            <ExploreFilter
                                filterName="category"
                                filter={categoryId}
                                onChange={handleCategoryIdChange}
                                filterOptions={categories}
                            />
                            <ExplorePriceRange
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                                handleMaxPriceBlur={handleMaxPriceBlur}
                                handleMaxPriceChange={handleMaxPriceChange}
                                handleMinPriceBlur={handleMinPriceBlur}
                                handleMinPriceChange={handleMinPriceChange}
                            />
                        </Box>
                        <Container
                            sx={{
                                width: "1000px",
                                //backgroundColor: "#D9F0FF ",
                                //color: "#F1E9DA",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                paddingBottom: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    marginTop: 2,
                                    marginBottom: 1,
                                    padding: 1,
                                    backgroundColor:
                                        theme.palette.secondary.main,
                                    color: "#1C2B36",
                                    borderRadius: 2,
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="h6">
                                    {" "}
                                    Search results for: "{searchTerm}"
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
                                                <MenuItem
                                                    key={index}
                                                    value={order}
                                                >
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
                                    categoryId={e.belongsto[0].categoryid}
                                    key={key}
                                />
                            ))}
                        </Container>
                        <ExploreRelevantItems randomItems={randomItems} />
                    </Box>
                )}
            </ThemeProvider>
        </>
    );
};

export default Explore;
