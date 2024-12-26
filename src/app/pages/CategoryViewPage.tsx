"use client";
import React from "react";
import Link from "next/link";
import { Decimal } from "@prisma/client/runtime/library";
import { useState, useEffect } from "react";
import CategoryItem from "../components/CategoryViewComponents/CategoryItem";
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

const orders = ["lowestPrice", "highestPrice", "newest", "oldest"];

type Item = {
    id: number; //promjena
    title: string;
    description: string | null; //promjena
    //belongsto: { categoryid: number }[]; //maknuto
    askingprice: Decimal; //promjena
    sellerid: string;
    buyerid?: string | null; //promjena
    conditionid: number;
};
type User = {
    id: string;
    country: string;
    city: string;
    street: string;
    houseNo: string;
    roleId: string;
};
type items_and_sellersType = {
    item: Item;
    sellerinfo: User;
};
type Category = {
    id: number;
    name: string;
    supercategoryid: number | null;
};
interface Props {
    categoryId: string;
}

const CategoryViewPage = ({ categoryId }: Props) => {
    var baseUrl = "http://localhost:3000";
    const [category, setCategory] = useState<Category>();
    const [items_and_sellers, setItems_and_sellers] = useState<
        items_and_sellersType[]
    >([]);
    const [pageNum, setPageNum] = useState(1);
    const [sortMethod, setSortMethod] = useState("");
    const [totalPages, setTotalPages] = useState(1);

    async function getCategory(id: string) {
        try {
            var res = await fetch(`${baseUrl}/api/getCategory?id=${id}`);
            if (res) {
                var categoryjson = await res.json();
                setCategory(categoryjson);
            }
        } catch (e) {
            console.log("Error while getting category!");
            console.log(e);
        }
    }

    async function getItemsAndSellers(pageNum: number, sort_method: string) {
        try {
            var res = await fetch(
                `${baseUrl}/api/getItemsByCategoryId?id=${categoryId}&orderBy=${sort_method}&pageNum=${pageNum}`
            );

            if (res) {
                var itemsjson = await res.json();
                if (itemsjson.finalItems)
                    setItems_and_sellers(itemsjson.finalItems);
                else setItems_and_sellers([]);
                if (itemsjson.totalPages) setTotalPages(itemsjson.totalPages);
                else setTotalPages(1);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getCategory(categoryId);
        getItemsAndSellers(pageNum, sortMethod);
    }, []);
    useEffect(() => {
        getItemsAndSellers(pageNum, sortMethod);
    }, [pageNum]);

    const handleSortMethodChange = (event: SelectChangeEvent<string>) => {
        setSortMethod(event.target.value);
    };
    useEffect(() => {
        console.log("items_and_sellers:");
        console.log(items_and_sellers);
    }, [items_and_sellers]);

    return (
        <>
            {category && (
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
                    >
                        <Button
                            variant="accentBtn"
                            href={"/categories"}
                            sx={{ mt: 1 }}
                        >
                            <b>Go back to categories</b>
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
                                Category: "{category.name}"
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
                                        value={sortMethod}
                                        onChange={handleSortMethodChange}
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
                                    setPageNum(Math.max(pageNum - 1, 1))
                                }
                                disabled={pageNum === 1}
                            >
                                Previous
                            </Button>
                            <Typography component="span">
                                Page {pageNum} of {totalPages}
                            </Typography>
                            <Button
                                onClick={() =>
                                    setPageNum(
                                        Math.min(pageNum + 1, totalPages)
                                    )
                                }
                                disabled={pageNum === totalPages}
                            >
                                Next
                            </Button>
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
                            {items_and_sellers.map((el, index) => (
                                <CategoryItem
                                    itemId={el.item.id}
                                    title={el.item.title}
                                    //price={el.item.askingprice}
                                    key={index}
                                    category={category}
                                    sellerinfo={el.sellerinfo}
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
