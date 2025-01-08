import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@/prisma';

export default async function POST(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const {itemId} = req.body;

            const item = await prisma.item.findUnique({
                where: {id: itemId},
            });

            if (!item) {
                return res.status(404).json({error: 'Item not found'});
            }

            res.status(200).json({priceId: item.priceId});
        } catch (error) {
            console.error('Error getting priceId:', error);
            res.status(500).json({error: 'Failed to get priceId'});
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}