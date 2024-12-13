"use client";
import { Container, Box } from "@mui/material";
import React from "react";
import ItemThumbnail from "../components/ItemViewComponents/ItemThumbnail";
import ItemDescription from "../components/ItemViewComponents/ItemDescription";
import ItemTitle from "../components/ItemViewComponents/ItemTitle";
import { useState, useContext, createContext } from "react";
//import theme from "../styles/theme";
import getItem from "../dataFunctions/fetchItem";
import getSeller from "../dataFunctions/fetchSeller";
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
//export const ItemViewContext = createContext(data);

type Props = {
    itemId: string;
    sellerId: string;
};

const ItemView = ({ itemId, sellerId }: Props) => {
    const itemInfo = getItem(itemId); //FETCH FUNCTIONS
    const sellerInfo = getSeller(sellerId); //FETCH FUNCTIONS

    return (
        <>
            {/*<ItemViewContext.Provider value={data}>*/}
            <Container
                sx={{
                    width: "950px",
                    //backgroundColor: "#D9F0FF",
                    color: theme.palette.textBlack.main,
                    height: "100vh",
                    padding: 2,
                    marginBottom: 20,
                    //paddingBottom: 90,
                    marginTop: 7,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <ItemThumbnail seller={seller} />
                <ItemTitle item={item} />
                <ItemDescription description={item.description} />
            </Container>
            {/*</ItemViewContext.Provider>*/}
        </>
    );
};

export default ItemView;
