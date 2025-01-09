import {NextApiRequest, NextApiResponse} from 'next';
import {stripe} from "@/app/lib/stripe";

export default async function POST(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const {itemId, name, description, priceInEuros} = req.body;

            // Create a Stripe Product
            const product = await stripe.products.create({
                name: name,
                description: description,
            });

            // Create a Stripe Price
            const price = await stripe.prices.create({
                unit_amount: priceInEuros * 100, // Convert Euros to cents
                currency: 'eur',
                product: product.id,
            });

            // Save productId and priceId into the item in the database
            await fetch(`/api/updateItem?id=${itemId}`, {
                method: "PUT",
                body: JSON.stringify({
                    productId: product.id,
                    priceId: price.id,
                }),
            });

            res.status(200).json({
                productId: product.id,
                priceId: price.id
            });
        } catch (error) {
            console.error('Error creating Stripe item:', error);
            res.status(500).json({error: 'Failed to create Stripe item'});
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}