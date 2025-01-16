"use client";

import {useEffect, useState} from 'react';
import {useElements, useStripe} from '@stripe/react-stripe-js';
import {item} from "@prisma/client";

type CheckoutFormProps = {
    itemId: string;
};

const CheckoutForm = ({itemId}: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState<item>();
    const [priceId, setPriceId] = useState<string>(null);

    console.log("CheckoutForm itemId: ", itemId);

    const fetchItem = (itemId: string) => {
        try {
            fetch(`/api/getItem?id=${itemId}`).then((res) => res.json()).then((data) => setItem(data.item));
        } catch (err: unknown) {
            console.log(err);
        }
    };

    const createPriceId = (item: item) => {
        console.log("Creating Stripe item for: ", JSON.stringify(item));
        fetch(`/api/createStripeItem`, {
            method: "POST",
            body: JSON.stringify({
                itemId: item.id,
                name: item.title,
                description: item.description,
                priceInEuros: item.askingprice,
            }),
        }).then((res) => res.json()).then((data) => setPriceId(data.fetchedPriceId));
    }

    useEffect(() => {
        fetchItem(itemId);
    }, [itemId, priceId]);

    useEffect(() => {
        if (item) {
            if (!item.priceId) {
                createPriceId(item);
            }
        }
    }, [item]);

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
            console.error("PriceId not found");
            void createPriceId(item);
        }

        try {
            fetch(`/api/createCheckoutSession`, {
                method: "POST",
                body: JSON.stringify({priceId, itemId}),
            }).then((res) => res.json()).then((session) => stripe.redirectToCheckout({sessionId: session.id}));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Pay Now'}
            </button>
        </form>
    );
};

export default CheckoutForm;