
export interface SyncItem {
    id: string; // UUID of the item (or operation ID)
    url: string;
    method: 'POST' | 'PUT' | 'DELETE';
    body?: any;
    timestamp: number;
    retryCount: number;
}

const STORAGE_KEY = 'offline_sync_queue';

export const getSyncQueue = (): SyncItem[] => {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
};

export const addToSyncQueue = (item: Omit<SyncItem, 'timestamp' | 'retryCount'>) => {
    if (typeof window === 'undefined') return;
    const queue = getSyncQueue();
    queue.push({ ...item, timestamp: Date.now(), retryCount: 0 });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
};

export const clearSyncQueue = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
};

export const removeFromQueue = (timestamp: number) => {
    if (typeof window === 'undefined') return;
    const queue = getSyncQueue();
    const newQueue = queue.filter(i => i.timestamp !== timestamp);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newQueue));
};

export const processSyncQueue = async () => {
    if (typeof window === 'undefined') return 0;
    // Check both navigator and our own db check if we want, but let's stick to simple first


    const queue = getSyncQueue();
    if (queue.length === 0) return 0;

    // Sort by timestamp to preserve order of operations
    const sorted = [...queue].sort((a, b) => a.timestamp - b.timestamp);
    let successCount = 0;

    for (const item of sorted) {
        try {
            console.log(`Syncing: ${item.method} ${item.url}`);
            const res = await fetch(item.url, {
                method: item.method,
                headers: { 'Content-Type': 'application/json' },
                body: item.body ? JSON.stringify(item.body) : undefined
            });

            if (res.ok) {
                removeFromQueue(item.timestamp);
                successCount++;
            } else {
                console.error(`Sync error (${res.status}): ${item.url}`);
                // If it's a client error (4xx), it will never succeed, so remove it
                if (res.status >= 400 && res.status < 500) {
                    removeFromQueue(item.timestamp);
                }
            }
        } catch (e) {
            console.error(`Sync network error:`, e);
            break; // Stop processing if network is truly down
        }
    }
    return successCount;
};
