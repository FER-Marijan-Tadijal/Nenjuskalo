import {loadStripe} from "@stripe/stripe-js";
import Stripe from "stripe";

export const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51QdwtbKH33mRKO25JpME8N7y6LpLs2TgxOuoQX2t5UbhJTK4nAiH5lGgYHVJe7h7Hyb3Va2QtuHePB3G4nAEjSCu00Qhnlu6F0"
);

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_51QdwtbKH33mRKO25Lc3AeEOiunGCpqeGTY5ufEnhwPt3WgIwY6YZ8J5CS03n5MtgBIvqhpoYap5WNsEIZQY9h5mo00ckfsEMHU", {
    apiVersion: '2025-01-07',
});
