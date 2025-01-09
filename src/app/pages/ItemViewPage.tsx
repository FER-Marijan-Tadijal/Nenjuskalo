"use client";
import {Container, Box} from "@mui/material";
import React, {useEffect} from "react";
import ItemThumbnail from "../components/ItemViewComponents/ItemThumbnail";
import ItemDescription from "../components/ItemViewComponents/ItemDescription";
import ItemTitle from "../components/ItemViewComponents/ItemTitle";
import {useState} from "react";
import theme from "../styles/theme";
import type {Session} from "next-auth";
import ItemThumbnailWrapper from "../components/ItemViewComponents/ItemThumbnail";

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

const ItemView = ({itemId, session}: ItemViewProps) => {
    console.log(itemId);
    const [item, setItem] = useState<Item | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const fetchItem = async (itemId: string) => {
        try {
            const res = await fetch(`/api/getItem?id=${itemId}`);
            /*if (!response.ok) {
                throw new Error("Failed to fetch item");
            }*/
            const data = await res.json();
            console.log(data);
            setItem(data.item);
        } catch (err: unknown) {
            console.log(err);
        }
    };
    const fetchUser = async (userId: string) => {
        const res = await fetch(
            `/api/getUser?id=${userId}`
        );
        const userData = await res.json();
        setUser(userData);
    };

    useEffect(() => {
        fetchItem(itemId);
    }, []);
    useEffect(() => {
        console.log(item);
        if (item) {
            const sellerId = item.sellerid;
            fetchUser(sellerId);
        }
    }, [item]);

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
            >
                {item && user && (
                    <>
                        <ItemThumbnailWrapper user={user} itemId={itemId} session={session}/>
                        <ItemTitle item={item}/>
                        <ItemDescription description={item.description}/>
                    </>
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
