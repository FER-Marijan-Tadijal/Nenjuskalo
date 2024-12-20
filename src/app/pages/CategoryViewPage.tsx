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
type items_and_sellersType = {
    item: Item;
    seller: {
        name: string | null;
    } | null;
};
type Props = {
    category: {
        id: number;
        name: string;
        supercategoryid: number | null;
    };
    items_and_sellers: items_and_sellersType[];
};

const CategoryViewPage = ({ category, items_and_sellers }: Props) => {
    return (
        <>
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
                    <Link href={"/categories"}>
                        <b>Go back to categories</b>
                    </Link>
                    <Box
                        sx={{
                            marginTop: 2,
                            marginBottom: 1,
                            padding: 1,
                            backgroundColor: theme.palette.secondary.main,
                            color: "#1C2B36",
                            borderRadius: 2,
                            //display: "flex",
                            //justifyContent: "space-around",
                            //alignItems: "center",
                        }}
                    >
                        <Typography variant="h4">
                            {" "}
                            Category: "{category.name}"
                        </Typography>
                        {/*
                        <Box
                            sx={{
                                backgroundColor: theme.palette.secondary.main,
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
                        */}
                    </Box>
                    {/*

                    <Box sx={{ border: "1px solid grey" }}>
                        <Button
                            onClick={() => setPage(Math.max(page - 1, 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <Typography component="span">
                            Page {page} of {totalPages}
                        </Typography>
                        <Button
                            onClick={() =>
                                setPage(Math.min(page + 1, totalPages))
                            }
                            disabled={page === totalPages}
                        >
                            Next
                        </Button>
                    </Box>
                    */}
                    <Box
                        sx={{
                            mt: 3,
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
                                //price={el.item.askingprice.toNumber()}
                                sellerId={el.item.sellerid}
                                key={index}
                                category={category}
                            />
                        ))}
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default CategoryViewPage;
