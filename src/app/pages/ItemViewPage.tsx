"use client";
import {Box, CircularProgress, Container, Typography,} from "@mui/material";
import React, {useEffect, useState} from "react";
import ItemThumbnail from "../components/ItemViewComponents/ItemThumbnail";
import ItemDescription from "../components/ItemViewComponents/ItemDescription";
import ItemTitle from "../components/ItemViewComponents/ItemTitle";
import theme from "../styles/theme";
import type {Session} from "next-auth";
import {category, item, itemchangestate} from "@prisma/client";

type BigItem = {
    item: item;
    categories: category[];
    state: itemchangestate;
    noOfPictures: number;
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
    const [item, setItem] = useState<BigItem>();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
        try {
            const res = await fetch(`/api/getUser?id=${userId}`);
            const userData = await res.json();
            setUser(userData);
        } catch (err: unknown) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItem(itemId);
    }, []);
    useEffect(() => {
        if (item) {
            const sellerId = item.item.sellerid;
            fetchUser(sellerId);
        }
        console.log(item);
    }, [item]);

    if (!item) {
        return <CircularProgress/>;
    }

    return (
        <>
            <Container
                sx={{
                    width: "950px",
                    color: theme.palette.textBlack.main,
                    height: "100%",
                    padding: 2,
                    marginTop: 7,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                className="slide-in-container-05s"
            >
                {!isLoading && user && (
                    <>
                        {item.state.stateid == 0 && (
                            <Box
                                sx={{
                                    mt: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                    height: "30px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        width: "180px",
                                        padding: "5px",
                                        borderRadius: 2,
                                        backgroundColor:
                                        theme.palette.accent.main,
                                    }}
                                    variant="h6"
                                >
                                    *SKICA*
                                </Typography>
                            </Box>
                        )}
                        <ItemThumbnail
                            itemId={itemId}
                            user={user}
                            session={session}
                            noOfPictures={item.noOfPictures}
                        />
                        <ItemTitle bigItem={item}/>
                        <ItemDescription description={item.item.description}/>
                    </>
                )}
                {isLoading && (
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
                    </Box>
                )}
            </Container>
        </>
    );
};

export default ItemView;
