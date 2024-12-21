"use client";
import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Container,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import ExploreItem from "../components/ExploreComponents/ExploreItem";
import ExploreFilter from "../components/ExploreComponents/ExploreFilter";
import theme from "../styles/theme";
import { ThemeProvider } from "@mui/material";
import ExplorePriceRange from "../components/ExploreComponents/ExplorePriceRange";
import ExploreRelevantItems from "../components/ExploreComponents/ExploreRelevantItems";

const conditions = [
    { name: "novo", id: 0 },
    { name: "rabljeno", id: 1 },
    { name: "osteceno", id: 2 },
];
const orders = ["lowestPrice", "highestPrice", "newest", "oldest"];

type Item = {
    id: number;
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
type categoryType = {
    id: number;
    name: string;
    supercategoryid: string | null;
};
type ExplorePageProps = {
    searchTerm: string;
};

//MOŽDA JOŠ STAVITI DIO KODA U ExploreHeader KOMPONENTU

const Explore = ({ searchTerm }: ExplorePageProps) => {
    const [categories, setCategories] = useState<categoryType[]>([]);
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

    const fetchCategories = async () => {
        const res = await fetch("http://localhost:3000/api/categories");
        const data = await res.json();
        console.log(data);
        setCategories(data);
    };

    const fetchRandomItems = async () => {
        //console.log(items[0].belongsto[0].categoryid);
        const randoms = await fetch(
            //`http://localhost:3000/api/getCategory?id=${items[0].belongsto[0].categoryid}`
            `http://localhost:3000/api/random?n=5`
        );
        const randomData = await randoms.json();
        setRandomItems(randomData);
    };

    const fetchItems = async (currentPage: number) => {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (currentPage) params.set("page", currentPage.toString());
        if (categoryId || categoryId == "0")
            params.set("categoryId", categoryId);
        if (conditionId || conditionId == "0")
            params.set("conditionId", conditionId);
        if (orderBy) params.set("orderBy", orderBy);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        console.log(params.toString());
        const res = await fetch(`http://localhost:3000/api/search?${params}`);
        //const res = await fetch(
        //    `http://localhost:3000/api/search?q=Ku&page=1&orderBy=newest&minPrice=0&maxPrice=20000000`
        //);
        const data = await res.json();

        if (Array.isArray(data.data)) {
            setItems(data.data);
        } else {
            setItems([]);
        }
        const pageNum = Math.round(data.totalCount / 10);
        if (pageNum) {
            setTotalPages(pageNum);
        } else {
            setTotalPages(1);
        }
    };

    useEffect(() => {
        console.log("Something changed");
        fetchItems(page);
    }, [page, categoryId, priceChanged, conditionId, orderBy]);
    useEffect(() => {
        fetchCategories();
        fetchRandomItems(); //ako stavimo da se dohvaćaju oglasi koji su ista kategorija, onda stavi useEffect kad god se promijeni items
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
                                filterName="stanje"
                                filter={conditionId}
                                onChange={handleConditionIdChange}
                                filterOptions={conditions}
                            />
                            <ExploreFilter
                                filterName="kategorija"
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
                                    Rezultati pretraživanja: "{searchTerm}"
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
                                            Sortiraj
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
                                        setPage(Math.max(page - 1, 1))
                                    }
                                    disabled={page === 1}
                                >
                                    Prijašnja
                                </Button>
                                <Typography component="span">
                                    Stranica {page} od {totalPages}
                                </Typography>
                                <Button
                                    onClick={() =>
                                        setPage(Math.min(page + 1, totalPages))
                                    }
                                    disabled={page === totalPages}
                                >
                                    Sljedeća
                                </Button>
                            </Box>
                            {items.map((e, key) => (
                                <ExploreItem
                                    itemId={e.id}
                                    title={e.title}
                                    price={e.askingprice}
                                    sellerId={e.sellerid}
                                    categoryObjects={e.belongsto}
                                    key={key}
                                    categories={categories}
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
