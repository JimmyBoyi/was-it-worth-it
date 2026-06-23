export function subscribeToGlobalStats(onUpdate: (globalProfit: number) => void) {
    const eventSource = new EventSource("http://localhost:3001/api/roulette/live-stats");

    eventSource.onmessage = (event) => {
        try {
            const parsed = JSON.parse(event.data);
            onUpdate(parsed.globalProfit);
        } catch (error) {
            console.error("Failed to parse SSE payload:", error);
        }
    };

    eventSource.onerror = (error) => {
        console.error("SSE Connection encountered an error:", error);
    };

    // Returns a function to break the connection cleanly when the user switches pages
    return () => {
        eventSource.close();
    };
}