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
import { useMediaQuery } from "@mui/material";
import ExploreItem from "../components/GlobalComponents/AdCard";
import ExploreFilter from "../components/ExploreComponents/ExploreFilter";
import theme from "../styles/theme";
import { ThemeProvider } from "@mui/material";
import ExplorePriceRange from "../components/ExploreComponents/ExplorePriceRange";
import ExploreRelevantItems from "../components/ExploreComponents/ExploreRelevantItems";
import { CircularProgress } from "@mui/material";

const conditions = [
    { name: "novo", id: 0 },
    { name: "rabljeno", id: 1 },
    { name: "osteceno", id: 2 },
];
const orders = [
    ["lowestPrice", "najniža cijena"],
    ["highestPrice", "najviša cijena"],
    ["newest", "najnovije"],
    ["oldest", "najstarije"],
];

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
    const [isLoading, setIsLoading] = useState(false);

    const isLargeScreen = useMediaQuery("(min-width:800px)");
    const isMoreThan600px = useMediaQuery("(min-width:600px)");
    const isLess600px = useMediaQuery("(min-width:600px)");

    const fetchCategories = async () => {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
    };

    const fetchRandomItems = async () => {
        //console.log(items[0].belongsto[0].categoryid);
        const randoms = await fetch(
            //`http://localhost:3000/api/getCategory?id=${items[0].belongsto[0].categoryid}`
            `/api/random?n=5`
        );
        const randomData = await randoms.json();
        setRandomItems(randomData);
    };

    const fetchItems = async (currentPage: number) => {
        setIsLoading(true);
        const params = new URLSearchParams();
        params.set("pageSize", "8");
        params.set("q", q);
        params.set("page", currentPage.toString());
        params.set("categoryId", categoryId);
        params.set("conditionId", conditionId);
        params.set("orderBy", orderBy);
        params.set("minPrice", minPrice);
        params.set("maxPrice", maxPrice);
        console.log(params.toString());
        try {
            const res = await fetch(`/api/search?${params}`);
            const data = await res.json();
            console.log(data);
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
        } catch (error) {
            console.error("Error fetching data:", error);
            setItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log(q);
        console.log("Something changed");
        fetchItems(page);
    }, [page, categoryId, priceChanged, conditionId, orderBy]);
    useEffect(() => {
        console.log(q);
        fetchCategories();
        fetchRandomItems(); //ako stavimo da se dohvaćaju oglasi koji su ista kategorija, onda stavi useEffect kad god se promijeni items
        fetchItems(page);
    }, [searchTerm]);

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
                {!isLoading ? (
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "start",
                                mt: 8,
                            }}
                            className="slide-in-container-05s"
                        >
                            <Box sx={{ width: "20%" }}>
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
                                {(isLargeScreen || !isMoreThan600px) && (
                                    <ExplorePriceRange
                                        minPrice={minPrice}
                                        maxPrice={maxPrice}
                                        handleMaxPriceBlur={handleMaxPriceBlur}
                                        handleMaxPriceChange={
                                            handleMaxPriceChange
                                        }
                                        handleMinPriceBlur={handleMinPriceBlur}
                                        handleMinPriceChange={
                                            handleMinPriceChange
                                        }
                                    />
                                )}
                            </Box>
                            <Container
                                sx={{
                                    width: "60%",
                                    //backgroundColor: "#D9F0FF ",
                                    //color: "#F1E9DA",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    paddingBottom: 1,
                                    margin: { xs: 0 },
                                    paddingRight: { sm: 7, xs: 7 },
                                    paddingLeft: { sm: 7 },
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
                                        width: "50%",
                                        minWidth: "140px",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor:
                                                theme.palette.secondary.main,
                                            padding: 1,
                                            borderRadius: 2,
                                            width: "70%",
                                        }}
                                    >
                                        <FormControl
                                            fullWidth
                                            variant="outlined"
                                        >
                                            <InputLabel
                                                id="select-label"
                                                shrink={false}
                                            >
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
                                                        value={order[0]}
                                                    >
                                                        {order[1]}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        border: "1px solid grey",
                                        display: "flex column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <Box>
                                        <Button
                                            onClick={() =>
                                                setPage(Math.max(page - 1, 1))
                                            }
                                            disabled={page === 1}
                                        >
                                            Prijašnja
                                        </Button>
                                        {isLargeScreen && (
                                            <Typography component="span">
                                                Stranica {page} od {totalPages}
                                            </Typography>
                                        )}
                                        <Button
                                            onClick={() =>
                                                setPage(
                                                    Math.min(
                                                        page + 1,
                                                        totalPages
                                                    )
                                                )
                                            }
                                            disabled={page === totalPages}
                                        >
                                            Sljedeća
                                        </Button>
                                    </Box>
                                    {!isLargeScreen && (
                                        <Box>
                                            <Typography component="span">
                                                Stranica {page} od {totalPages}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                                {items.map((e, index) => (
                                    <ExploreItem
                                        itemId={e.id}
                                        title={e.title}
                                        price={e.askingprice}
                                        sellerId={e.sellerid}
                                        categoryObjects={e.belongsto}
                                        key={index}
                                        categories={categories}
                                        checkPage={true}
                                    />
                                ))}
                            </Container>
                            {isLargeScreen && (
                                <Box sx={{ width: "20%" }}>
                                    <ExploreRelevantItems
                                        randomItems={randomItems}
                                    />
                                </Box>
                            )}
                            {!isLargeScreen && isMoreThan600px && (
                                <ExplorePriceRange
                                    minPrice={minPrice}
                                    maxPrice={maxPrice}
                                    handleMaxPriceBlur={handleMaxPriceBlur}
                                    handleMaxPriceChange={handleMaxPriceChange}
                                    handleMinPriceBlur={handleMinPriceBlur}
                                    handleMinPriceChange={handleMinPriceChange}
                                />
                            )}
                        </Box>
                        {!isLargeScreen && (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mb: 1,
                                }}
                            >
                                <ExploreRelevantItems
                                    randomItems={randomItems}
                                />
                            </Box>
                        )}
                    </Box>
                ) : (
                    <CircularProgress
                        sx={{
                            width: "100vw",
                            height: "100vh",
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                        }}
                    ></CircularProgress>
                )}
            </ThemeProvider>
        </>
    );
};

export default Explore;
