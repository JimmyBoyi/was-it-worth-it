import RoulettePage from "./pages/RoulettePage";
import {GlobalStatsPayload, subscribeToGlobalStats} from "./utils/LiveStatsService";
import {useEffect, useState} from "react";
import {useSessionProfit} from "./utils/sessionStore";

export default function App() {
    const [globalHouseProfit, setGlobalHouseProfit] = useState<number>(0);
    const [totalBetsCount, setTotalBetsCount] = useState<number>(0);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const sessionProfit = useSessionProfit();

    useEffect(() => {
        const unsubscribe = subscribeToGlobalStats((latestStats: GlobalStatsPayload) => {
            setGlobalHouseProfit(latestStats.globalProfit);
            setTotalBetsCount(latestStats.totalEntries);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <header className="bg-neutral-800 text-white pr-8 rounded-md">
                <div className="relative grid grid-cols-3 items-center w-full">
                    <div></div>
                    <h1 className="text-center font-bold text-xl">Is It Worth It?</h1>
                    <div className="flex flex-col items-end text-right">
                        <p>Global Players Profit: <strong>${globalHouseProfit.toFixed(2)}</strong> over {totalBetsCount} spins</p>
                        <p className="text-sm text-gray-400">This session Profit: <strong>${sessionProfit}</strong></p>
                        {isLoggedIn ? <p className="text-sm text-gray-400">Your total Profit: <strong>42</strong></p>
                            : <p className="text-sm text-gray-400">Log in to see personal total profit</p> }
                    </div>
                </div>
            </header>
            <RoulettePage />
        </div>
    );
}