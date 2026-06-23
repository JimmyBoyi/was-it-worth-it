import RoulettePage from "./pages/RoulettePage";
import {subscribeToGlobalStats} from "./utils/LiveStatsService";
import {useEffect, useState} from "react";

export default function App() {
    const [globalHouseProfit, setGlobalHouseProfit] = useState<number>(0);

    useEffect(() => {
        const unsubscribe = subscribeToGlobalStats((latestTotal) => {
            setGlobalHouseProfit(latestTotal);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <header style={{ background: "#222", color: "#fff", padding: "15px", borderRadius: "8px" }}>
                <h2>🎰 Gambling Live Dashboard</h2>
                <p>Global Players Profit: <strong>${globalHouseProfit.toFixed(2)}</strong></p>
            </header>
            <RoulettePage />
        </div>
    );
}