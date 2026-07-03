export interface GlobalStatsPayload {
    globalProfit: number;
    totalEntries: number;
}

export function subscribeToGlobalStats(onUpdate: (stats: GlobalStatsPayload) => void) {
    const eventSource = new EventSource("http://localhost:3001/api/stats/live-stats");

    eventSource.onmessage = (event) => {
        try {
            const parsed = JSON.parse(event.data);
            onUpdate({
                globalProfit: parsed.globalProfit || 0,
                totalEntries: parsed.totalEntries || 0
            });
        } catch (error) {
            console.error("Failed to parse SSE payload:", error);
        }
    };

    eventSource.onerror = (error) => {
        console.error("SSE Connection encountered an error:", error);
    };

    return () => {
        eventSource.close();
    };
}