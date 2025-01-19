import {redirect, RedirectType} from "next/navigation";


export const handleCheckout = async (itemId: string, buyerId: string) => {
    let sessionUrl = undefined;

    console.log("Handling checkout for item: ", itemId);

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
            console.log("Created Stripe item: ", fetchedProductId, fetchedPriceId);
        }

        // Create a new Stripe Checkout session and redirect to it
        const sessionResponse = await fetch(`/api/createCheckoutSession`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({priceId, itemId, buyerId}),
        });
        sessionUrl = (await sessionResponse.json()).url;
        console.log("Session url fetched: ", sessionUrl);
    } catch (error) {
        console.error("Error handling checkout:", error);
        return;
    }

    if (sessionUrl) {
        console.log("Redirecting to: ", sessionUrl);
        redirect(sessionUrl, RedirectType.push);
    } else {
        console.error("Session URL not found");
        return true;
    }
};