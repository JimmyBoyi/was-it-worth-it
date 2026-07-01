import RoulettePage from "./pages/RoulettePage";
import {subscribeToGlobalStats} from "./utils/LiveStatsService";
import {useEffect, useState} from "react";

export default function App() {
    const [globalHouseProfit, setGlobalHouseProfit] = useState<number>(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = subscribeToGlobalStats((latestTotal) => {
            setGlobalHouseProfit(latestTotal);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <header style={{ background: "#222", color: "#fff", paddingRight: "40px", borderRadius: "8px" }}>
                <div className="relative grid grid-cols-3 items-center w-full">
                    <div></div>
                    <h1 className="text-center font-bold text-xl">Is It Worth It?</h1>
                    <div className="flex flex-col items-end text-right">
                        <p>Global Players Profit: <strong>${globalHouseProfit.toFixed(2)}</strong></p>
                        <p className="text-sm text-gray-400">This session Profit: <strong>1,245</strong></p>
                        {isLoggedIn ? <p className="text-sm text-gray-400">Your total Profit: <strong>42</strong></p>
                            : <p className="text-sm text-gray-400">Log in to see personal total profit</p> }
                    </div>
                </div>
            </header>
            <RoulettePage />
        </div>
    );
}