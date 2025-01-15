"use client";
import React from "react";
import Link from "next/link";
import { Decimal } from "@prisma/client/runtime/library";
import { useState, useEffect } from "react";
import CategoryItem from "../components/GlobalComponents/AdCard";
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
import theme from "../styles/theme";
import { ThemeProvider } from "@mui/material";
import { orderByEnum } from "../enums/orderByEnum";
import { useMediaQuery } from "@mui/material";

const orders = [
    ["lowestPrice", "najniža cijena"],
    ["highestPrice", "najviša cijena"],
    ["newest", "najnovije"],
    ["oldest", "najstarije"],
];

type Item2 = {
    id: number; //promjena
    title: string;
    description: string | null; //promjena
    //belongsto: { categoryid: number }[]; //maknuto
    askingprice: number; //promjena
    sellerid: string;
    buyerid?: string | null; //promjena
    conditionid: number;
};
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
type User = {
    seller1: {
        name: string | null;
        id: string;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
    seller2: {
        id: string;
        country: string | null;
        city: string | null;
        street: string | null;
        houseno: string | null;
        roleid: number;
    };
};
type items_and_sellersType = {
    item: Item;
    sellerinfo: User;
};
type Category = {
    id: number;
    name: string;
    supercategoryid: string | null;
};
interface Props {
    categoryId: string;
}

const CategoryViewPage = ({ categoryId }: Props) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category>();
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState(1);
    const [orderBy, setOrderBy] = useState("");
    const [totalPages, setTotalPages] = useState(1);

    const isLargeScreen = useMediaQuery("(min-width:800px)");

    async function getSelectedCategory(id: string) {
        try {
            var res = await fetch(`/api/getCategory?id=${id}`);
            if (res) {
                var categoryjson = await res.json();
                setSelectedCategory(categoryjson);
            }
        } catch (e) {
            console.log("Error while getting category!");
            console.log(e);
        }
    }

    const fetchCategories = async () => {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
    };

    const fetchItems = async (currentPage: number) => {
        const params = new URLSearchParams();
        params.set("q", "");
        params.set("page", currentPage.toString());
        params.set("categoryId", categoryId);
        params.set("pageSize", "12");
        params.set("orderBy", orderBy);
        console.log(params.toString());
        const res = await fetch(`/api/search?${params}`);
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
        getSelectedCategory(categoryId);
        fetchCategories();
        fetchItems(page);
    }, []);
    useEffect(() => {
        fetchItems(page);
    }, [page, orderBy]);

    const handleOrderByChange = (event: SelectChangeEvent<string>) => {
        setOrderBy(event.target.value);
    };

    return (
        <>
            {selectedCategory && (
                <ThemeProvider theme={theme}>
                    <Container
                        sx={{
                            width: "65%",
                            //backgroundColor: "#D9F0FF ",
                            //color: "#F1E9DA",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingBottom: 1,
                            mt: 8,
                        }}
                        className="slide-in-container-05s"
                    >
                        <Button
                            variant="accentBtn"
                            href={"/categories"}
                            sx={{ mt: 1, textAlign: "center" }}
                        >
                            <b>Povratak na kategorije</b>
                        </Button>
                        <Box
                            sx={{
                                marginTop: 2,
                                marginBottom: 1,
                                padding: 1,
                                backgroundColor: theme.palette.secondary.main,
                                color: "#1C2B36",
                                borderRadius: 2,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h4">
                                {" "}
                                Kategorija: "{selectedCategory.name}"
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
                                        setPage(Math.min(page + 1, totalPages))
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
                        <Box
                            sx={{
                                mt: 1,
                                display: "grid",
                                gridTemplateColumns: {
                                    sm: "400px", // Single column on extra small screens
                                    md: "repeat(2, 400px)", // Two columns on small screens and up
                                },
                                gap: 2, // Spacing between items
                            }}
                        >
                            {items.map((e, index) => (
                                <CategoryItem
                                    itemId={e.id}
                                    title={e.title}
                                    price={e.askingprice}
                                    sellerId={e.sellerid}
                                    categoryObjects={e.belongsto}
                                    key={index}
                                    categories={categories}
                                    checkPage={false}
                                />
                            ))}
                        </Box>
                    </Container>
                </ThemeProvider>
            )}
        </>
    );
};

export default CategoryViewPage;
