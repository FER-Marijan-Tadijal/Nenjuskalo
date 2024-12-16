"use client";
import { Container, Box } from "@mui/material";
import React, { useEffect } from "react";
import ItemThumbnail from "../components/ItemViewComponents/ItemThumbnail";
import ItemDescription from "../components/ItemViewComponents/ItemDescription";
import ItemTitle from "../components/ItemViewComponents/ItemTitle";
import { useState, useContext, createContext } from "react";
//import theme from "../styles/theme";
import getItem from "../dataFunctions/fetchItem";
import getSeller from "../dataFunctions/fetchSeller";
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
//export const ItemViewContext = createContext(data);

type Item = {
    itemId: string;
    title: string;
    description: string;
    askingPrice: string;
    sellerId: string;
    buyerId?: string;
    condition: ["new", "used"];
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

/*type Props = {
    itemId: string;
    sellerId: string;
};*/

const ItemView = (/*{ itemId, sellerId }: Props*/) => {
    const router = useRouter();
    const { itemId } = router.query as { itemId?: string };
    const [item, setItem] = useState<Item | null>(null);
    const [seller, setSeller] = useState<Seller | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!itemId) return; // Avoid making the fetch until `itemId` is available

        const fetchItem = async () => {
            try {
                const response = await fetch(`/api/items/${itemId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch item");
                }
                const data = await response.json(); // Specify the expected type of the response
                setItem(data);
            } catch (err: unknown) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        const fetchSeller = async (sellerId: string) => {
            try {
                const response = await fetch(`/api/sellers/${sellerId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch seller");
                }
                const data = await response.json(); // Specify the expected type of the response
                setItem(data);
            } catch (err: unknown) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
        if (item) {
            const sellerId = item.sellerId;
            fetchSeller(sellerId);
        }
    }, [itemId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!item) return <NotFoundPage />;

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
                <div>
                    {itemId} and {/*sellerId*/}
                </div>
                <ItemThumbnail seller={data.seller} />
                <ItemTitle item={data.item} />
                <ItemDescription description={item.description} />
            </Container>
            {/*</ItemViewContext.Provider>*/}
        </>
    );
};

export default ItemView;
