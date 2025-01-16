"use client";

import {useEffect, useState} from 'react';
import {useElements, useStripe} from '@stripe/react-stripe-js';
import {item} from "@prisma/client";
import {Box, Button, Paper, Typography} from "@mui/material";
import {redirect} from "next/navigation";

type CheckoutFormProps = {
    itemId: string;
};

const CheckoutForm = ({itemId}: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState<item>();
    const [priceId, setPriceId] = useState<string>(null);

    const fetchItem = (itemId: string) => {
        try {
            fetch(`/api/getItem?id=${itemId}`).then((res) => res.json()).then((data) => setItem(data.item));
        } catch (err: unknown) {
            console.log(err);
        }
    };

    const createPriceId = (item: item) => {
        fetch(`/api/createStripeItem`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                itemId: item.id,
                name: item.title,
                description: item.description,
                priceInEuros: item.askingprice,
            }),
        }).then((res) => res.json()).then((data) => data.fetchedPriceId ? setPriceId(data.fetchedPriceId) : console.error("PriceId not created"));
    }

    useEffect(() => {
        fetchItem(itemId);
    }, [itemId, priceId]);

    useEffect(() => {
        if (item) {
            if (!item.priceId) {
                createPriceId(item);
            } else {
                setPriceId(item.priceId);
            }
        }
    }, [item]);

    useEffect(() => {
        if (priceId) {
            handleSubmit(new Event('go'));
        }
    }, [priceId]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        if (!item) {
            console.error("Item not found");
            return;
        }

        if (!item.priceId) {
            console.error("PriceId not found - 1");
            void createPriceId(item);
        }

        try {
            if (!priceId) {
                console.error("PriceId not found - 2");
                return;
            }

            fetch(`/api/createCheckoutSession`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({priceId, itemId}),
            }).then((res) => res.json()).then((data) => redirect(data.url));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{mt: 20}}>
            <Typography>herro</Typography>
            <Paper>
                <form onSubmit={handleSubmit}>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Pay Now'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default CheckoutForm;