
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { since, user } = req.query;
        let lastSync = new Date(0);

        if (since && typeof since === 'string') {
            lastSync = new Date(since);
            if (isNaN(lastSync.getTime())) lastSync = new Date(0);
        }

        // Query AuditLog for changes since lastSync
        const updates = await prisma.auditLog.findMany({
            where: {
                createdAt: {
                    gt: lastSync
                }
            },
            take: 100, // Increase to ensure we don't miss remote updates
            orderBy: { createdAt: 'desc' }
        });

        if (updates.length === 0) {
            return res.status(200).json({ hasUpdates: false });
        }

        // Check if updates are from OTHER users
        let remoteUpdates = false;
        let remoteUser = 'Desconocido';

        for (const log of updates) {
            try {
                if (log.details) {
                    const det = JSON.parse(log.details);
                    const logUser = String(det.updatedBy || '').trim();
                    const requestingUser = String(user || '').trim();

                    if (logUser !== requestingUser) {
                        remoteUpdates = true;
                        remoteUser = logUser || 'Desconocido';
                        break;
                    }
                } else {
                    // If no details, we can't be sure, but it's safer to sync
                    remoteUpdates = true;
                    break;
                }
            } catch (e) {
                remoteUpdates = true;
                break;
            }
        }

        // If filtering by user is strict, we might return false if all updates are own.
        // But for now, returning true is safer to ensure sync.

        return res.status(200).json({
            hasUpdates: remoteUpdates,
            user: remoteUser,
            latest: updates[0].createdAt
        });

    } catch (error) {
        console.error('Check sync error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
