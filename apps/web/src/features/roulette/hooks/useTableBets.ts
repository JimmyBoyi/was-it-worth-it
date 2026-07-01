import { useRef } from 'react';
import { RouletteBet } from "@shared/types/roulette";
import { RouletteWinType } from "@shared/enums/RouletteWinTypes";
import { calculateOverlapAmount } from '../utils/domGeometry';
import { ZoneData } from '../utils/rouletteTableLayout';

export function useTableBets(layoutFields: ZoneData[]) {
    const zoneRefs = useRef<{ [type: string]: HTMLDivElement | null }>({});

    const compileCurrentBets = (): RouletteBet[] => {
        const allChips = document.querySelectorAll('.roulette-chip');
        const finalBets: RouletteBet[] = [];
        const largestOverlappingFields = new Map<string, number>();
        const table = document.getElementById("roulette-table");

        allChips.forEach((chip) => {
            const chipElement = chip as HTMLElement;
            if(table && calculateOverlapAmount(table, chipElement) == 0){
                return;
            }
            let largestOverlappingField = { type: "", overlapAmount: 0, chipValue: 0 };

            layoutFields.forEach((field) => {
                const zoneElement = zoneRefs.current[field.type];
                if (!zoneElement) return;

                const overlapAmount = calculateOverlapAmount(chipElement, zoneElement);
                if (overlapAmount && largestOverlappingField.overlapAmount < overlapAmount) {
                    largestOverlappingField = {
                        type: field.type,
                        overlapAmount,
                        chipValue: Number(chipElement.dataset.value)
                    };
                }
            });

            if (largestOverlappingField.type) {
                const currentTotal = largestOverlappingFields.get(largestOverlappingField.type) || 0;
                largestOverlappingFields.set(largestOverlappingField.type, currentTotal + largestOverlappingField.chipValue);
            }
        });

        largestOverlappingFields.forEach((value: number, key: string) => {
            const keyAsNumber = Number(key);
            if (!isNaN(keyAsNumber)) {
                finalBets.push({ type: keyAsNumber, amount: value });
            } else {
                finalBets.push({ type: key as RouletteWinType, amount: value });
            }
        });

        return finalBets;
    };

    return { zoneRefs, compileCurrentBets };
}