import {stripePromise} from "@/app/lib/stripe";


export const handleCheckout = async (itemId: string) => {
    const priceId = await fetch(`/api/getPriceIdByItemId`, {
        method: "POST",
        body: JSON.stringify({itemId}),
    }).then((res) => res.json());
    console.log("priceId", priceId);

    const response = await fetch(`/api/createCheckoutSession`, {
        method: "POST",
        body: JSON.stringify({priceId}),
    });

    const session = await response.json();

    const stripe = await stripePromise;
    const {error} = await stripe!.redirectToCheckout({
        sessionId: session.id,
    });

    if (error) {
        console.error("Stripe Checkout error:", error);
    }
};