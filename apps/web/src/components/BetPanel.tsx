import {useState} from "react";
import {spinRoulette} from "../api/roulette";
import {RouletteWinType} from "@shared/enums/RouletteWinTypes";

export default function BetPanel() {
    const [betType, setBetType] = useState<RouletteWinType | number>(RouletteWinType.RED);
    const [amount, setAmount] = useState(10);
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    
    function convertStringToBetType(value: string): RouletteWinType | number{
        const numeric = Number(value);

        if (!Number.isNaN(numeric)) {
            return numeric;
        } else {
            return value as RouletteWinType;
        }
    }

    async function handleSpin() {
        setLoading(true);
        setResult(null);

        try {
            const res = await spinRoulette(betType, amount);
            setResult(res);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Roulette</h2>

            <select value={betType} onChange={(e) => setBetType(convertStringToBetType(e.target.value))}>
                <option value={RouletteWinType.RED}>Red</option>
                <option value={RouletteWinType.BLACK}>Black</option>
                <option value={RouletteWinType.RED}>Even</option>
                <option value={RouletteWinType.ODD}>Odd</option>
                <option value={0}>0</option>
                <option value={17}>17</option>
            </select>

            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />

            <button onClick={handleSpin} disabled={loading}>
                {loading ? "Spinning..." : "Spin"}
            </button>

            {result && (
                <div>
                    <p>Win: {result.payoutMultiplier > 0 ? "YES" : "NO"}</p>
                    <p>Payout: {result.profit}</p>
                    <p>Profit: {result.profit - amount}</p>
                    <p>Number: {result.rolledNumber} {result.colour}</p>
                </div>
            )}
        </div>
    );
}