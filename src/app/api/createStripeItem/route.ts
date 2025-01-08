import { NextApiRequest, NextApiResponse } from 'next';
import {stripe} from "@/app/lib/stripe";
import {prisma} from "@/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { name, description, priceInEuros } = req.body;

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

            // save productId and priceId into the item in the database
            const item = await prisma.item.update(); // TODO: Update the item in the database with the productId and priceId

            res.status(200).json({
                productId: product.id,
                priceId: price.id
            });
        } catch (error) {
            console.error('Error creating Stripe item:', error);
            res.status(500).json({ error: 'Failed to create Stripe item' });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}