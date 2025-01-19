import {stripe} from "@/app/lib/stripe";
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma";

export async function POST(
    req: NextRequest
) {
    if (req.method === 'POST') {
        try {
            const {itemId, name, description, priceInEuros} = await req.json();

            // Create a Stripe Product
            const product = await stripe.products.create({
                name: name,
                description: description,
            });

            // Check if the product was created successfully
            if (product.lastResponse.statusCode !== 200) {
                return NextResponse.json({
                    statusCode: 500,
                    message: product.lastResponse.headers,
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
                return NextResponse.json({
                    statusCode: 500,
                    message: price.lastResponse.headers,
                });
            }

            // Save productId and priceId into the item in the database
            await prisma.item.update({
                where: {id: itemId},
                data: {
                    productId: product.id,
                    priceId: price.id,
                },
            });

            return NextResponse.json({
                statusCode: 200,
                fetchedProductId: product.id,
                fetchedPriceId: price.id,
            });
        } catch (error) {
            console.error('Error creating Stripe item:', error);
            return NextResponse.json({
                statusCode: 500,
                message: error.message,
            });
        }
    } else {
        return NextResponse.json({
            statusCode: 405,
            message: 'Method Not Allowed',
            headers: {
                'Allow': ['POST'],
            },
        });
    }
}