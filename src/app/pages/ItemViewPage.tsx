"use client";
import { Container, Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import ItemThumbnail from "../components/ItemViewComponents/ItemThumbnail";
import ItemDescription from "../components/ItemViewComponents/ItemDescription";
import ItemTitle from "../components/ItemViewComponents/ItemTitle";
import { useState } from "react";
//import theme from "../styles/theme";
import theme from "../styles/theme";
import type { Session } from "next-auth";
import { category, item, itemchangestate } from "@prisma/client";

type BigItem = {
    item: item;
    categories: category[];
    state: itemchangestate[];
    noOfPictures: number;
};

type Item = {
    itemid: string;
    title: string;
    description: string;
    askingprice: string;
    sellerid: string;
    buyerid?: string;
    conditionid: number;
};
type User = {
    id: string;
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
    session: Session | null;
};

const ItemView = ({ itemId, session }: ItemViewProps) => {
    console.log(itemId);
    const [item, setItem] = useState<BigItem>();
    const [user, setUser] = useState<User | null>(null);

    const fetchItem = async (itemId: string) => {
        try {
            const res = await fetch(`/api/getItem?id=${itemId}`);
            /*if (!response.ok) {
                throw new Error("Failed to fetch item");
            }*/
            const data = await res.json();
            console.log(data);
            setItem(data);
        } catch (err: unknown) {
            console.log(err);
        }
    };
    const fetchUser = async (userId: string) => {
        const res = await fetch(`/api/getUser?id=${userId}`);
        const userData = await res.json();
        setUser(userData);
    };

    useEffect(() => {
        fetchItem(itemId);
    }, []);
    useEffect(() => {
        console.log(item);
        if (item) {
            const sellerId = item.item.sellerid;
            fetchUser(sellerId);
        }
    }, [item]);

    if (!item) {
        return <CircularProgress />;
    }

    return (
        <>
            <Container
                sx={{
                    width: "950px",
                    color: theme.palette.textBlack.main,
                    height: "100vh",
                    padding: 2,
                    marginTop: 7,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                className="slide-in-container-05s"
            >
                {item && user && (
                    <ItemThumbnail
                        itemId={itemId}
                        user={user}
                        session={session}
                        noOfPictures={item.noOfPictures}
                    />
                )}
                {item && user && <ItemTitle bigItem={item} />}
                {item && user && (
                    <ItemDescription description={item.item.description} />
                )}
                {(!user || !item) && (
                    <Box
                        sx={{
                            marginTop: 30,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: theme.palette.secondary.main,
                            padding: 3,
                            borderRadius: 2,
                            fontSize: 30,
                        }}
                    >
                        Stranica se učitava...
                    </Box> //NEMJESTI DA SE NIŠTA NE RENDERA DOK SVE NIJE SPREMNO
                )}
            </Container>
        </>
    );
};

export default ItemView;
