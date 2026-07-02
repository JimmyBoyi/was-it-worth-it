import {RouletteWinType} from "@shared/enums/RouletteWinTypes";
import {ROULETTE_THEMES} from "@roulette/constants/theme";
import {getRouletteColour} from "@roulette/utils/rouletteColourCalculator";

export interface ZoneData {
    type: string;
    label: string;
    gridClass: string;
    bgClass: string;
}

export const generateRouletteLayout = (): ZoneData[] => {
    const layout: ZoneData[] = [];

    layout.push({
        type: '0',
        label: '0',
        gridClass: 'col-start-1 row-start-1 row-span-3 h-full',
        bgClass: ROULETTE_THEMES.hover.green
    });

    for (let num = 1; num <= 36; num++) {
        const colStart = Math.floor((num - 1) / 3) + 2;

        let rowStart = 3;
        if (num % 3 === 0) rowStart = 1;
        else if (num % 3 === 2) rowStart = 2;

        layout.push({
            type: `${num}`,
            label: num.toString(),
            gridClass: `col-start-${colStart} row-start-${rowStart}`,
            bgClass: getRouletteColour(num.toString()) == "red" ? ROULETTE_THEMES.hover.red : ROULETTE_THEMES.hover.black
        });
    }

    layout.push(
        { type: RouletteWinType.FIRST_COLUMN, label: '2 to 1', gridClass: 'col-start-14 row-start-1', bgClass: ROULETTE_THEMES.hover.green },
        { type: RouletteWinType.SECOND_COLUMN, label: '2 to 1', gridClass: 'col-start-14 row-start-2', bgClass: ROULETTE_THEMES.hover.green },
        { type: RouletteWinType.THIRD_COLUMN, label: '2 to 1', gridClass: 'col-start-14 row-start-3', bgClass: ROULETTE_THEMES.hover.green }
    );

    layout.push(
        { type: RouletteWinType.FIRST_DOZEN, label: '1st 12', gridClass: 'col-start-2 col-span-4 row-start-4 h-12', bgClass: ROULETTE_THEMES.hover.greenMuted },
        { type: RouletteWinType.SECOND_DOZEN, label: '2nd 12', gridClass: 'col-start-6 col-span-4 row-start-4 h-12', bgClass: ROULETTE_THEMES.hover.greenMuted },
        { type: RouletteWinType.THIRD_DOZEN, label: '3rd 12', gridClass: 'col-start-10 col-span-4 row-start-4 h-12', bgClass: ROULETTE_THEMES.hover.greenMuted }
    );

    layout.push(
        { type: RouletteWinType.LOW, label: '1-18', gridClass: 'col-start-2 col-span-2 row-start-5 h-12', bgClass: ROULETTE_THEMES.hover.green },
        { type: RouletteWinType.EVEN, label: 'Even', gridClass: 'col-start-4 col-span-2 row-start-5 h-12', bgClass: ROULETTE_THEMES.hover.green },
        { type: RouletteWinType.RED, label: 'Red', gridClass: 'col-start-6 col-span-2 row-start-5 h-12', bgClass: ROULETTE_THEMES.hover.red },
        { type: RouletteWinType.BLACK, label: 'Black', gridClass: 'col-start-8 col-span-2 row-start-5 h-12', bgClass: ROULETTE_THEMES.hover.black },
        { type: RouletteWinType.ODD, label: 'Odd', gridClass: 'col-start-10 col-span-2 row-start-5 h-12', bgClass: ROULETTE_THEMES.hover.green },
        { type: RouletteWinType.HIGH, label: '19-36', gridClass: 'col-start-12 col-span-2 row-start-5 h-12', bgClass: ROULETTE_THEMES.hover.green }
    );

    return layout;
};