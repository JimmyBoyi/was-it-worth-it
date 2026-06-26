// Chip.tsx
import { useEffect, useRef } from 'react';
import { createDraggable, spring } from 'animejs';

interface ChipProps {
    value: number;
}

export function Chip({ value }: ChipProps) {
    const chipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chipRef.current) return;

        const draggable = createDraggable(chipRef.current, {
            releaseEase: spring({ bounce: 0.4, stiffness: 200 })
        });

        return () => {draggable.revert()};
    }, []);

    return (
        <div
            ref={chipRef}
            data-value={value} // Store the value here for the DOM query
            className="roulette-chip w-14 h-14 bg-red-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg cursor-grab active:cursor-grabbing select-none border-4 border-dashed border-white ring-4 ring-red-700 m-4"
        >
            ${value}
        </div>
    );
}