import {stripePromise} from "@/app/lib/stripe";


export const handleCheckout = async (itemId: string) => {
    try {
        let item = await fetch(`/api/getItem?id=${itemId}`).then((res) => res.json());
        if (!item) {
            console.error("Item not found");
            return;
        }

        item = item.item;
        let priceId = item.priceId;
        if (!item.priceId) {
            console.log("Creating Stripe item for: ", JSON.stringify(item));
            const {fetchedProductId, fetchedPriceId} = await fetch(`/api/createStripeItem`, {
                method: "POST",
                body: JSON.stringify({
                    itemId: item.id,
                    name: item.title,
                    description: item.description,
                    priceInEuros: item.askingprice,
                }),
            });
            priceId = fetchedPriceId;
        }

        // Create a new Stripe Checkout session
        const response = await fetch(`/api/createCheckoutSession`, {
            method: "POST",
            body: JSON.stringify({priceId, itemId}),
        });

        const session = await response.json();

        const stripe = await stripePromise;
        const {error} = await stripe!.redirectToCheckout({
            sessionId: session.id,
        });

        if (error) {
            console.error("Stripe Checkout error:", error);
        }
    } catch (error) {
        console.error("Error handling checkout:", error);
        return;
    }
};