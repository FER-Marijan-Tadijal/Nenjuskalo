"use client";
import { Container, Box } from "@mui/material";
import React from "react";
import ItemThumbnail from "../components/ItemViewComponents/ItemThumbnail";
import ItemDescription from "../components/ItemViewComponents/ItemDescription";
import ItemSideInfo from "../components/ItemViewComponents/ItemSideInfo";
import ItemTitle from "../components/ItemViewComponents/ItemTitle";
import { useState, useContext, createContext } from "react";
import theme from "../styles/theme";

const item = {
    title: "Mercedes Benz 2022 EQ-class",
    price: 120000,
    condition: "new",
    description:
        "The 2024 Mercedes-Benz S-Class redefines the luxury sedan experience with unmatched elegance, innovation, and power. Crafted with precision, this model combines sophisticated style with advanced technology, setting new standards in both comfort and performance. Under the hood, the S-Class offers a powerful inline-six or optional V8 engine, delivering smooth acceleration and effortless power on the road.",
};
const seller = {
    name: "Toni",
    surname: "Vanjak",
    contact: "0991234567",
    country: "Croatia",
    city: "Zagreb",
    street: "Dupci",
    houseNo: "6C",
};

const data = { item, seller };

export const ItemViewContext = createContext(data);

const ItemView = () => {
    return (
        <>
            {/* HEADER */}
            <ItemViewContext.Provider value={data}>
                <Container
                    sx={{
                        width: "900px",
                        backgroundColor: "#D9F0FF",
                        color: "#1C2B36",
                        height: "100vh",
                        padding: 2,
                        marginTop: 7,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <ItemThumbnail />
                    <ItemTitle />
                    <ItemDescription />
                </Container>
            </ItemViewContext.Provider>
        </>
    );
};

export default ItemView;
