import { useState, useEffect } from 'react';

let globalSessionProfit = 0;
const listeners = new Set<(value: number) => void>();

export const sessionStore = {
    getProfit: () => globalSessionProfit,
    addProfit: (amount: number) => {
        globalSessionProfit += amount;
        listeners.forEach((listener) => listener(globalSessionProfit));
    },
    subscribe: (listener: (value: number) => void) => {
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    }
};

export function useSessionProfit() {
    const [profit, setProfit] = useState(sessionStore.getProfit());

    useEffect(() => {
        const unsubscribe = sessionStore.subscribe(setProfit);
        return unsubscribe;
    }, []);

    return profit;
}