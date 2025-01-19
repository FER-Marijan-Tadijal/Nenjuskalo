import {NextRequest, NextResponse} from "next/server";
import {stripe} from "@/app/lib/stripe";

export async function POST(request: NextRequest) {
    try {
        const {priceInEuros} = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: priceInEuros * 100,
            currency: "eur",
            automatic_payment_methods: {enabled: true},
        });

        return NextResponse.json({clientSecret: paymentIntent.client_secret});
    } catch (error) {
        return NextResponse.json(
            {error: `Internal Server Error: ${error}`, statusCode: 500}
        );
    }
}