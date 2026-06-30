import {useCallback, useState} from "react";
import {spinRoulette} from "../api/roulette";
import {RouletteWinType} from "@shared/enums/RouletteWinTypes";
import {waapi} from "animejs";
import animate = waapi.animate;
import {getRouletteColour} from "../utils/RouletteColourCalculator";
import "./BetPanel.css"
import {RouletteSpinResponseDto} from "@shared/schemas/RouletteSpinResponseSchema";
import RollHistory from "@components/RouletteSpinHistory";
import {RouletteTable} from "@components/RouletteTable";
import {RouletteBet} from "@shared/types/roulette";
import {RollingStrip} from "@components/RollingStrip";

export const WHEEL_NUMBERS = ["0", "32", "15", "19", "4", "21", "2", "25", "17", "34", "6", "27", "13", "36", "11", "30", "8", "23", "10", "5", "24", "16", "33", "1", "20", "14", "31", "9", "22", "18", "29", "7", "28", "12", "35", "3", "26"];

export default function BetPanel() {
    const [isLoading, setIsLoading] = useState(false);
    const [spinHistory, setSpinHistory] = useState<RouletteSpinResponseDto[]>([]);
    
    function convertStringToBetType(value: string): RouletteWinType | number{
        const numeric = Number(value);

        if (!Number.isNaN(numeric)) {
            return numeric;
        } else {
            return value as RouletteWinType;
        }
    }

    function resetRouletteWheel() {
        animate('.animateable-strip', {
            translateX: 0,
            duration: 0.5,
        });
    }

    async function handleSpin(bets: RouletteBet[]) {
        setIsLoading(true);
        resetRouletteWheel();

        try {
            const res = await spinRoulette(bets);
            spinRouletteAnimate(res.rolledNumber);
            setTimeout(() => {
                setSpinHistory((prev) => [res, ...prev].slice(0, 50));
                setIsLoading(false);
            }, 6000);
        } catch (e) {
            console.error(e);
        }
    }

    const spinRouletteAnimate = (rolledNumber: number) => {
        const tileWidth = 80;
        const viewportWidth = 600;
        const fieldIndex: number = WHEEL_NUMBERS.indexOf(rolledNumber.toString());
        const randomOffset = (Math.random() * tileWidth) - 40;
        
        const targetX = -((fieldIndex * tileWidth) - (viewportWidth / 2) + (tileWidth / 2) + (tileWidth * 37 * 3) + randomOffset);

        animate('.animateable-strip', {
            translateX: targetX,
            duration: 5000,
            easing: 'cubic-bezier(0.1, 1, 0.1, 4)',
        });
    };

    return (
        <div className="p-20 w-max">
            <RouletteTable performAfterBetCalculations={handleSpin} isLoading={isLoading}/>
            <RollHistory spinHistory={spinHistory}/>
        </div>
    );
}