"use client";
import { Container, Box } from "@mui/material";
import React, { useEffect } from "react";
import ItemThumbnail from "../components/ItemViewComponents/ItemThumbnail";
import ItemDescription from "../components/ItemViewComponents/ItemDescription";
import ItemTitle from "../components/ItemViewComponents/ItemTitle";
import { useState, useContext, createContext } from "react";
//import theme from "../styles/theme";
import { getItem, getUser } from "@/app/util/getFromId";
import theme from "../styles/theme";
import { useRouter } from "next/router";
import NotFoundPage from "./NotFoundPage";

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

type Item = {
    itemid: string;
    title: string;
    description: string;
    askingprice: string;
    sellerid: string;
    buyerid?: string;
    condition: ["new", "used"];
};
type User = {
    userId: string;
    name: string;
    surname: string;
    email: string;
    googleId: string;
    password?: string;
    country?: string;
    city?: string;
    street?: string;
    houseno?: string;
    registerTime: string;
    role: string;
};

type ItemViewProps = {
    itemId: string;
};

const ItemView = ({ itemId }: ItemViewProps) => {
    const [item, setItem] = useState<Item | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const fetchItem = async (itemId: string) => {
        try {
            const res = await fetch(`/api/getItem?id=${itemId}`);
            /*if (!response.ok) {
                throw new Error("Failed to fetch item");
            }*/
            const data = await res.json();
            console.log(data.item);
            setItem(data.item);
        } catch (err: unknown) {
            console.log(err);
        }
    };
    const fetchUser = async (userId: string) => {
        const res = await fetch(
            `http://localhost:3000/api/getUser?id=${userId}`
        );
        const userData = await res.json();
        console.log(userData);
        setUser(userData);
    };

    useEffect(() => {
        fetchItem(itemId);
    }, []);
    useEffect(() => {
        if (item) {
            const sellerId = item.sellerid;
        }
    }, [item]);

    return (
        <>
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
                {user && <ItemThumbnail user={user} />}
                {item && <ItemTitle item={item} />}
                {item && <ItemDescription description={item.description} />}
                {/*!user || !item || (
                    <Box sx={{ mt: 10 }}>Something went wrong!</Box>        //NEMJESTI DA SE NIŠTA NE RENDERA DOK SVE NIJE SPREMNO
                )*/}
            </Container>
        </>
    );
};

export default ItemView;
