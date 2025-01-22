"use client";
import React, {useEffect, useState} from "react";
import {Box, Button, ThemeProvider, Typography} from "@mui/material";
import theme from "../styles/theme";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {HandleAddBuyerIdToItem} from "@/app/functions/handleAddBuyerIdToItem";
import {HandleMarkItemAsSold} from "@/app/functions/handleMarkItemAsSold";

const conditions = ["novo", "rabljeno", "osteceno"];
type Item = {
    itemid: string;
    title: string;
    description: string;
    askingprice: string;
    sellerid: string;
    buyerid?: string;
    conditionid: number;
};
type Seller = {
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
type SuccessProp = {
    itemId: string;
    buyerId: string;
};

const PaymentSuccessPage = ({itemId, buyerId}: SuccessProp) => {
    console.log("Entered PaymentSuccessPage");
    console.log("itemId: ", itemId);
    console.log("buyerId: ", buyerId);

    const [item, setItem] = useState<Item | null>(null);
    const [seller, setSeller] = useState<Seller | null>(null);

    const fetchItem = async (itemId: string) => {
        try {
            const res = await fetch(`/api/getItem?id=${itemId}`);
            const data = await res.json();
            console.log(data);
            setItem(data.item);
        } catch (err: unknown) {
            console.log(err);
        }
    };
    const fetchSeller = async (sellerId: string) => {
        const res = await fetch(
            `/api/getUser?id=${sellerId}`
        );
        const sellerData = await res.json();
        setSeller(sellerData);
    };

    useEffect(() => {
        fetchItem(itemId);
    }, []);
    useEffect(() => {
        if (item) {
            const sellerId = item.sellerid;
            fetchSeller(sellerId);
        }
    }, [item]);

    useEffect(() => {
        console.log("Handling add buyer id to item");
        console.log("itemId: ", itemId);
        console.log("buyerId: ", buyerId);
        void HandleAddBuyerIdToItem({itemId, buyerId: buyerId});
        void HandleMarkItemAsSold(itemId);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    marginTop: 10,
                    height: "70vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                className="slide-in-container-05s"
            >
                <Box
                    sx={{
                        width: "450px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: theme.palette.green.main,
                        padding: 3,
                        borderRadius: 2,
                    }}
                >
                    <CheckCircleOutlineIcon
                        sx={{fontSize: "50px"}}
                    ></CheckCircleOutlineIcon>
                    <Typography component="span" variant="h4">
                        Kupnja uspješna!
                    </Typography>
                    <Box sx={{mb: 2}}>
                        <Typography
                            component="span"
                            variant="h5"
                            textAlign="center"
                        >
                            Vaše plaćanje je dovršeno:
                        </Typography>
                        <Typography
                            component="span"
                            variant="h5"
                            textAlign="center"
                            fontStyle="oblique"
                            sx={{ml: 1}}
                        >
                            {item?.askingprice} €
                        </Typography>
                    </Box>
                    <Typography
                        component="span"
                        variant="h6"
                        textAlign="center"
                        fontWeight={600}
                    >
                        • {item?.title}
                    </Typography>
                    <Typography
                        component="span"
                        variant="h6"
                        textAlign="center"
                        fontStyle="oblique"
                    >
                        Stanje: {conditions[item?.conditionid || 0]}
                    </Typography>
                    <Typography
                        component="span"
                        variant="h6"
                        textAlign="center"
                        fontStyle="oblique"
                    >
                        Lokacija: {seller?.city}, {seller?.street}{" "}
                        {seller?.houseno}
                    </Typography>
                    <Button
                        variant="accentBtn"
                        href="/"
                        fullWidth
                        sx={{mt: 2}}
                    >
                        Povratak na početnu stranicu
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default PaymentSuccessPage;
