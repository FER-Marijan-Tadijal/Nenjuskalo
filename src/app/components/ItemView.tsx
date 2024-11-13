"use client";
import { Container, Box } from "@mui/material";
import React from "react";
import ItemThumbnail from "./ItemViewComponents/ItemThumbnail";
import ItemDetails from "./ItemViewComponents/ItemDescription";
import ItemSideInfo from "./ItemViewComponents/ItemSideInfo";
import { useState, useContext, createContext } from "react";

const item = {
    title: "Mercedes Benz 2022 EQ-class",
    price: 120000,
    condition: "new",
    description:
        " simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
                        backgroundColor: "white",
                        height: "100vh",
                        padding: 4,
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            backgroundColor: "red",
                            display: "flex",
                            justifyContent: "space-between",
                            p: 2,
                        }}
                    >
                        <ItemThumbnail />
                        <ItemSideInfo />
                    </Box>
                    <ItemDetails />
                </Container>
            </ItemViewContext.Provider>
        </>
    );
};

export default ItemView;
