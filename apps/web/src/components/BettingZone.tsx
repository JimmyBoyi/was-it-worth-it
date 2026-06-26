import { useRef, useState } from 'react';

interface DropZoneProps {
    onCalculateBet?: (total: number) => void;
}

export function BettingZone({ onCalculateBet}: DropZoneProps) {
    const [totalBet, setTotalBet] = useState(0);
    const zoneRef = useRef<HTMLDivElement>(null);

    const isOverlapping = (el1: HTMLElement, el2: HTMLElement) => {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();

        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    };

    const handleSpinWheel = () => {
        if (!zoneRef.current) return;

        const chips = document.querySelectorAll('.roulette-chip');
        let calculatedTotal = 0;

        chips.forEach((chip) => {
            const chipElement = chip as HTMLElement;

            if (isOverlapping(chipElement, zoneRef.current!)) {
                const chipValue = Number(chipElement.dataset.value) || 0;
                calculatedTotal += chipValue;
            }
        });
        setTotalBet(calculatedTotal);
        console.log("Final calculated bet from DOM scanning:", calculatedTotal);

        if (onCalculateBet) {
            onCalculateBet(calculatedTotal);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div
                ref={zoneRef}
                data-zone-type="roulette-board"
                className="w-64 h-32 border-4 border-dashed border-emerald-500 bg-emerald-950/40 rounded-xl flex flex-col items-center justify-center transition-colors hover:bg-emerald-950/60"
            >
                <span className="text-emerald-400 font-semibold tracking-wider text-sm uppercase">Betting Zone</span>
                <span className="text-3xl font-extrabold text-white mt-1">${totalBet}</span>
            </div>

            <button
                onClick={handleSpinWheel}
                className="px-6 py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-400 transition-colors"
            >
                Spin & Check Bets
            </button>
        </div>
    );
}