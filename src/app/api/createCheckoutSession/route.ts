import {stripe} from "@/app/lib/stripe";
import {NextRequest, NextResponse} from "next/server";

export async function POST(
    req: NextRequest
) {
    if (req.method === 'POST') {
        try {
            const {priceId, itemId} = await req.json();

            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${req.headers.host}/paymentSuccess/${itemId}`,
                cancel_url: `${req.headers.host}/paymentFailure/${itemId}`,
            });

            return NextResponse.json({
                statusCode: 200,
                id: session.id,
            });
        } catch (err: any) {
            return NextResponse.json({
                statusCode: 500,
                message: err.message,
            });
        }
    } else {
        return NextResponse.json({
            statusCode: 405,
            message: 'Method Not Allowed',
            headers: {
                'Allow': 'POST',
            },
        });
    }
}