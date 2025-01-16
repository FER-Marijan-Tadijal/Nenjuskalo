import {NextApiRequest} from 'next';
import {stripe} from "@/app/lib/stripe";

export async function POST(
    req: NextApiRequest
) {
    if (req.method === 'POST') {
        try {
            const {itemId, name, description, priceInEuros} = req.body;

            // Create a Stripe Product
            const product = await stripe.products.create({
                name: name,
                description: description,
            });

            // Check if the product was created successfully
            if (product.lastResponse.statusCode !== 200) {
                return new Response({
                    status: 500,
                    body: JSON.stringify({
                        statusCode: 500,
                        message: product.lastResponse.headers,
                    }),
                });
            }

            // Create a Stripe Price
            const price = await stripe.prices.create({
                unit_amount: priceInEuros * 100, // Convert Euros to cents
                currency: 'eur',
                product: product.id,
            });

            // Check if the price was created successfully
            if (price.lastResponse.statusCode !== 200) {
                return new Response({
                    status: 500,
                    body: JSON.stringify({
                        statusCode: 500,
                        message: price.lastResponse.headers,
                    }),
                });
            }

            // Save productId and priceId into the item in the database
            await fetch(`/api/updateItem?id=${itemId}`, {
                method: "PUT",
                body: JSON.stringify({
                    productId: product.id,
                    priceId: price.id,
                }),
            });

            return new Response({
                status: 200,
                body: JSON.stringify({
                    fetchedProductId: product.id,
                    fetchedPriceId: price.id,
                }),
            });
        } catch (error) {
            console.error('Error creating Stripe item:', error);
            return new Response({
                status: 500,
                body: JSON.stringify({
                    statusCode: 500,
                    message: error.message,
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