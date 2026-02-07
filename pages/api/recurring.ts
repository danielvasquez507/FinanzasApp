import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const items = await prisma.recurring.findMany({
                where: { deletedAt: null }
            });
            const sanitized = items.map(i => ({ ...i, amount: Number(i.amount) }));
            res.status(200).json(sanitized);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch recurring' });
        }
    } else if (req.method === 'POST') {
        try {
            const { type, name, amount, owner } = req.body;
            const parsedAmount = parseFloat(amount);

            if (isNaN(parsedAmount)) {
                return res.status(400).json({ error: 'Invalid amount' });
            }

            const newItem = await prisma.recurring.create({
                data: {
                    type,
                    name,
                    amount: parsedAmount,
                    owner
                },
            });

            await prisma.auditLog.create({
                data: {
                    action: 'CREATE',
                    entity: 'Recurring',
                    entityId: newItem.id.toString(),
                    details: JSON.stringify({ name, amount, type })
                }
            });

            res.status(201).json({ ...newItem, amount: Number(newItem.amount) });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create recurring' });
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: 'Missing ID' });

        const idStr = Array.isArray(id) ? id[0] : id;
        const idNum = Number(idStr);

        if (isNaN(idNum)) return res.status(400).json({ error: 'Invalid ID' });

        try {
            // Soft Delete
            await prisma.recurring.update({
                where: { id: idNum },
                data: { deletedAt: new Date() }
            });

            await prisma.auditLog.create({
                data: {
                    action: 'DELETE',
                    entity: 'Recurring',
                    entityId: idStr,
                    details: 'Soft deleted via API'
                }
            });

            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete recurring' });
        }
    } else if (req.method === 'PUT') {
        const { id, type, name, amount, owner } = req.body;
        const parsedAmount = parseFloat(amount);

        if (isNaN(parsedAmount)) return res.status(400).json({ error: 'Invalid amount' });

        try {
            const updated = await prisma.recurring.update({
                where: { id: Number(id) },
                data: { type, name, amount: parsedAmount, owner }
            });

            await prisma.auditLog.create({
                data: {
                    action: 'UPDATE',
                    entity: 'Recurring',
                    entityId: id.toString(),
                    details: JSON.stringify({ name, amount })
                }
            });

            res.status(200).json({ ...updated, amount: Number(updated.amount) });
        } catch (e) {
            res.status(500).json({ error: 'Update failed' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
