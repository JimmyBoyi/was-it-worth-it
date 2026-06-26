import {useCallback, useState} from "react";
import {spinRoulette} from "../api/roulette";
import {RouletteWinType} from "@shared/enums/RouletteWinTypes";
import {waapi} from "animejs";
import animate = waapi.animate;
import {getRouletteColour} from "../utils/RouletteColourCalculator";
import "./BetPanel.css"
import {RouletteSpinResponseDto} from "@shared/schemas/RouletteSpinResponseSchema";
import RollHistory from "@components/RouletteSpinHistory";
import {Chip} from "@components/RouletteChip";
import {BettingZone} from "@components/BettingZone";

export default function BetPanel() {
    const [betType, setBetType] = useState<RouletteWinType | number>(RouletteWinType.RED);
    const [totalAmount, setTotalAmount] = useState(0);
    const [result, setResult] = useState<RouletteSpinResponseDto | null>(null);
    const [loading, setLoading] = useState(false);
    const [spinHistory, setSpinHistory] = useState<RouletteSpinResponseDto[]>([]);
    
    const WHEEL_NUMBERS = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
    const REPEATED_STRIP = [...WHEEL_NUMBERS, ...WHEEL_NUMBERS, ...WHEEL_NUMBERS, ...WHEEL_NUMBERS];
    
    function convertStringToBetType(value: string): RouletteWinType | number{
        const numeric = Number(value);

        if (!Number.isNaN(numeric)) {
            return numeric;
        } else {
            return value as RouletteWinType;
        }
    }

    function resetRouletteWheel() {
        animate('.roulette-strip', {
            translateX: 0,
            duration: 0.5,
        });
    }

    async function handleSpin(betAmount: number) {
        setLoading(true);
        resetRouletteWheel();
        setResult(null);

        try {
            const res = await spinRoulette(betType, betAmount);
            setSpinHistory((prev) => [res, ...prev].slice(0, 50));
            setResult(res);
            spinRouletteAnimate(res.rolledNumber);
        } finally {
            setLoading(false);
        }
    }

    const spinRouletteAnimate = (rolledNumber: number) => {
        const tileWidth = 80;
        const viewportWidth = 600;
        const fieldIndex: number = WHEEL_NUMBERS.indexOf(rolledNumber);
        
        const targetX = -((fieldIndex * tileWidth) - (viewportWidth / 2) + (tileWidth / 2) + (tileWidth * 37 * 3));

        animate('.roulette-strip', {
            translateX: targetX,
            duration: 5000,
            easing: 'cubic-bezier(0.1, 1, 0.1, 1)',
        });
    };

    const onDeposit = useCallback((amount: number) => {
        setTotalAmount((prevAmount) => {
            const nextAmount = prevAmount + amount;
            return nextAmount > 30 ? 30 : nextAmount;
        });
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>Roulette</h2>

            <select value={betType} onChange={(e) => setBetType(convertStringToBetType(e.target.value))}>
                <option value={RouletteWinType.RED}>Red</option>
                <option value={RouletteWinType.BLACK}>Black</option>
                <option value={RouletteWinType.EVEN}>Even</option>
                <option value={RouletteWinType.ODD}>Odd</option>
                <option value={0}>0</option>
                <option value={17}>17</option>
            </select>

            {/*<input
                type="number"
                value={totalAmount}
                onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val > 40) {
                        setTotalAmount(40);
                    } else {
                        setTotalAmount(val);
                    }}}
            />*/}
            <Chip value={10} onDeposit={onDeposit}></Chip>
            <Chip value={10} onDeposit={onDeposit}></Chip>
            <Chip value={10} onDeposit={onDeposit}></Chip>
            <BettingZone onCalculateBet={handleSpin}/>
            <button onClick={handleSpin} disabled={loading}>
                {loading ? "Spinning..." : "Spin"}
            </button>
            <div className="roulette-wrapper">
                {/* The physical marker indicating the winning number */}
                <div className="roulette-pointer"></div>

                {/* The window that hides the overflow and handles the edge fading */}
                <div className="roulette-viewport">
                    <div className="roulette-strip">
                        {REPEATED_STRIP.map((number, index) => {
                            const color = getRouletteColour(number);
                            return (
                                <div key={index} className={`roulette-tile ${color}`}>
                                    <span>{number}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <RollHistory spinHistory={spinHistory} />
        </div>
    );
}