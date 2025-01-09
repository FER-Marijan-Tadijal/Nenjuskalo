import {NextApiRequest, NextApiResponse} from 'next';
import {stripe} from "@/app/lib/stripe";

export default async function POST(
    req: NextApiRequest,
    res: NextApiResponse
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

            res.status(200).json({sessionId: session.id});
        } catch (err: any) {
            res.status(500).json({statusCode: 500, message: err.message});
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}