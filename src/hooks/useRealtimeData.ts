import { useEffect, useState } from 'react';
import { ref, onValue, off, DatabaseReference } from 'firebase/database';
import { database } from '@/lib/firebase';
import { WasteLog, BinStatus } from '@/types';
import { mockWasteLogs, mockBinStatuses } from '@/data/mockData';

export const useRealtimeData = () => {
    const [wasteLogs, setWasteLogs] = useState<WasteLog[]>(mockWasteLogs);
    const [binStatuses, setBinStatuses] = useState<BinStatus[]>(mockBinStatuses);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // References to database nodes
        const logsRef = ref(database, 'wasteLogs');
        const binsRef = ref(database, 'binStatuses');
        const connectedRef = ref(database, '.info/connected');

        const handleData = <T extends { id?: string }>(snapshot: any, setter: (data: T[]) => void, mockData: T[]) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                let dataArray: T[] = [];

                if (Array.isArray(data)) {
                    dataArray = data;
                } else if (typeof data === 'object' && data !== null) {
                    // Map object keys to id property
                    dataArray = Object.entries(data).map(([key, value]) => ({
                        ...(value as T),
                        id: key
                    }));
                }

                // Parse Date objects from strings
                // Firebase stores dates as ISO strings, but the UI expects Date objects
                dataArray = dataArray.map(item => {
                    const newItem = { ...item } as any;
                    if (newItem.timestamp) newItem.timestamp = new Date(newItem.timestamp);
                    if (newItem.lastUpdated) newItem.lastUpdated = new Date(newItem.lastUpdated);
                    return newItem as T;
                });

                setter(dataArray);
            } else {
                // Fallback to mock data if node doesn't exist yet
                setter(mockData);
            }
        };

        // Subscribe to connection status
        const listConnected = onValue(connectedRef, (snap) => {
            setIsConnected(!!snap.val());
        });

        // Subscribe to waste logs
        const listLogs = onValue(logsRef, (snapshot) => {
            handleData(snapshot, setWasteLogs, mockWasteLogs);
        });

        // Subscribe to bin statuses
        const listBins = onValue(binsRef, (snapshot) => {
            handleData(snapshot, setBinStatuses, mockBinStatuses);
        });

        // Cleanup listeners
        return () => {
            listConnected(); // onValue returns the unsubscribe function directly
            listLogs();
            listBins();
        };
    }, []);

    return { wasteLogs, binStatuses, isConnected };
};
