
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            // Check connection by running a simple count
            const categories = await prisma.category.count();
            const transactions = await prisma.transaction.count();
            const recurring = await prisma.recurring.count();

            res.status(200).json({
                status: 'online',
                counts: {
                    categories,
                    transactions,
                    recurring
                }
            });
        } catch (error) {
            console.error('Database connection error:', error);
            res.status(503).json({
                status: 'offline',
                error: 'Database connection failed'
            });
        }
    } else {
        res.status(405).end('Method Not Allowed');
    }
}
