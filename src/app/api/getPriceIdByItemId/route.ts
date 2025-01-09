import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET' || req.method === 'POST') {
        try {
            const itemId = req.method === 'GET' ? req.query.itemId : req.body.itemId;

            if (!itemId) {
                return res.status(400).json({message: 'Please provide an item id'});
            }

            const item = await prisma.item.findUnique({
                where: {id: itemId},
            });

            if (!item) {
                return res.status(404).json({message: 'No items found'});
            }

            return res.status(200).json({priceId: item.priceId});
        } catch (error) {
            console.error('Error getting priceId:', error);
            return res.status(500).json({error: 'Failed to get priceId'});
        }
    } else {
        res.setHeader('Allow', 'GET, POST');
        res.status(405).end('Method Not Allowed');
    }
}