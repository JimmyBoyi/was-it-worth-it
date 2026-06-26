import React from 'react';
import {RouletteSpinResponseDto} from "@shared/schemas/RouletteSpinResponseSchema";
import {getRouletteColour} from "../utils/RouletteColourCalculator";

interface RollHistoryProps {
    spinHistory: RouletteSpinResponseDto[];
}

export default function RollHistory({ spinHistory }: RollHistoryProps) {
    return (
        <div className="relative w-full max-w-md mx-auto mt-8">
            <h3 className="text-lg font-semibold text-left mb-3 text-[var(--text-h)]">
                My Spin History
            </h3>
            <div
                className="h-64 overflow-y-auto pr-2 space-y-2 scrollbar-thin
                   [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]
                   [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
            >
                {spinHistory.length === 0 ? (
                    <p className="text-sm text-gray-400 italic text-left py-4">
                        You haven't spun the wheel yet this session!
                    </p>
                ) : (
                    spinHistory.map((spin) => {
                        const isWin = spin.payout > 0;
                        const bgColour = getRouletteColour(spin.rolledNumber);

                        return (
                            <div
                                key={spin.spinId}
                                className={`flex items-center justify-between p-3 rounded-lg border border-[var(--border)] transition-colors
                                    ${isWin
                                    ? 'bg-green-500/30'
                                    : 'bg-transparent'
                                }`}
                            >
                            <div style={{backgroundColor: bgColour}} className="flex items-center space-x-3">
                                <span className={`inline-flex items-center justify-center w-12 h-12 rounded-md text-white font-bold text-sm`}>
                                    {spin.rolledNumber}
                                </span>
                            </div>
                                <div className="text-right">
                                    <span className={`text-sm font-bold ${isWin ? 'text-white' : 'text-red-600'}`}>
                                      {isWin ? "+" : null}{spin.profit.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}