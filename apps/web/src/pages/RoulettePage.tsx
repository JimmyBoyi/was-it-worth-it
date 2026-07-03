import {useState} from "react";
import {RouletteSpinResponseDto} from "@shared/schemas/RouletteSpinResponseSchema";
import {spinRoulette} from "@api/roulette";
import {RouletteTable} from "@roulette/components/RouletteTable";
import RollHistory from "@roulette/components/RouletteSpinHistory";
import {resetRouletteWheel, RollingStrip, spinStripAnimate} from "@components/RollingStrip";
import {Chip} from "@roulette/components/RouletteChip";
import {getRouletteColour} from "@roulette/utils/rouletteColourCalculator";
import {getCompiledBets} from "@roulette/utils/tableBridge";
import {WHEEL_CONFIGS} from "../constants/rollingStripWheelConfigs";
import {sessionStore} from "../utils/sessionStore";

export default function RoulettePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [spinHistory, setSpinHistory] = useState<RouletteSpinResponseDto[]>([]);

    async function handleSpin() {
        setIsLoading(true);
        resetRouletteWheel(WHEEL_CONFIGS.ROULETTE.elementSelector);
        const bets = getCompiledBets();
        
        try {
            const res: RouletteSpinResponseDto = await spinRoulette(bets);
            spinStripAnimate(res.rolledNumber.toString(), WHEEL_CONFIGS.ROULETTE.elementSelector);
            setTimeout(() => {
                setSpinHistory((prev) => [res, ...prev]);
                sessionStore.addProfit(res.profit);
                setIsLoading(false);
            }, 5100);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="w-full flex flex-col items-center">

            <div className="p-8 bg-emerald-900 text-white flex flex-col items-center w-max">
                <RouletteTable/>

                <div className="flex justify-between w-full">
                    <RollingStrip config={WHEEL_CONFIGS.ROULETTE} getFieldColour={getRouletteColour}/>

                    <div className="flex flex-col items-center ">
                        <button onClick={handleSpin} className={`mt-6 px-6 py-3 ${isLoading ? "bg-gray-500" : "bg-amber-500"} font-bold rounded`} disabled={isLoading}>
                            Spin Wheel
                        </button>

                        <div className="flex gap-4 mt-8 bg-emerald-950/50 p-4 rounded-xl w-max">
                            <Chip value={5} />
                            <Chip value={10} />
                            <Chip value={25} />
                        </div>

                    </div>
                </div>
                <RollHistory spinHistory={spinHistory}/>

            </div>
        </div>
    );
}