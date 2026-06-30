import { useImperativeHandle, useRef, useState, forwardRef } from 'react';

interface DropZoneProps {
    type: string;
    label?: string;
    className?: string;
}

export const BettingZone = forwardRef<HTMLDivElement, DropZoneProps>(
    ({ type, label, className = "w-24 h-24" }, ref) => {
        const [totalBet, setTotalBet] = useState(0);
        const internalRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(ref, () => internalRef.current!);

        return (
            <div
                ref={internalRef}
                data-zone-type={type}
                className={`${className} border border-emerald-600 bg-emerald-950/40 flex flex-col items-center justify-center transition-colors hover:bg-emerald-950/60 select-none relative`}
            >
                <span className="text-white font-bold text-lg">
                    {label || type}
                </span>

                {totalBet > 0 && (
                    <span className="absolute bottom-1 bg-amber-500 text-neutral-950 text-xs font-extrabold px-1.5 rounded-full shadow">
                        ${totalBet}
                    </span>
                )}
            </div>
        );
    }
);

BettingZone.displayName = 'BettingZone';