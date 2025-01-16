"use client";

import {use} from "react";
import CheckoutForm from "@/app/pages/CheckoutForm";
import {stripePromise} from "@/app/lib/stripe";
import {Elements} from "@stripe/react-stripe-js";

export default function Page({params}: { params: Promise<{ id: string }> }) {
    const {id} = use(params);

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm itemId={id}/>
        </Elements>
    );
}
