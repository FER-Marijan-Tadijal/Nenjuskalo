import {NextApiRequest} from 'next';
import {stripe} from "@/app/lib/stripe";

export async function POST(
    req: NextApiRequest
) {
    if (req.method === 'POST') {
        try {
            const {priceId, itemId} = req.body;

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

            return new Response({
                status: 200,
                body: JSON.stringify(session),
            });
        } catch (err: any) {
            return new Response({
                status: 500,
                body: JSON.stringify({
                    statusCode: 500,
                    message: err.message,
                }),
            });
        }
    } else {
        return new Response({
            status: 405,
            body: 'Method Not Allowed',
            headers: {
                'Allow': ['POST'],
            },
        });
    }
}