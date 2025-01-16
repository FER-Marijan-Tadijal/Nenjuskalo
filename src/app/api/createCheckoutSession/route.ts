import {stripe} from "@/app/lib/stripe";
import {NextRequest, NextResponse} from "next/server";
import {redirect} from "next/navigation";

export async function POST(
    req: NextRequest
) {
    if (req.method === 'POST') {
        try {
            const {priceId, itemId} = await req.json();

            const session = await stripe.checkout.sessions.create({
                submit_type: 'pay',
                billing_address_collection: 'auto',
                shipping_address_collection: {
                    allowed_countries: ['HR', 'RS', 'BA', 'SI', 'ME', 'MK'],
                },
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${req.nextUrl.origin}/paymentSuccess/${itemId}`,
                cancel_url: `${req.nextUrl.origin}/paymentFailure/${itemId}`,
            });

            if (session.url) {
                redirect(session.url);
            } else {
                return NextResponse.json({
                    statusCode: 500,
                    message: 'Error creating Stripe Checkout session',
                });
            }
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