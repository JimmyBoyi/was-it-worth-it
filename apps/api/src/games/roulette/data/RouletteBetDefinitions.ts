import {RouletteWinType} from "../enums/RouletteWinTypes";

export type RouletteBetDefinitionType = {
    payoutMultiplier: number;
    probability: number;
};

export const RouletteBetDefinitions: Record<RouletteWinType, RouletteBetDefinitionType> = {
    [RouletteWinType.RED]: {
        payoutMultiplier: 2,
        probability: 18 / 37,
    },
    [RouletteWinType.BLACK]: {
        payoutMultiplier: 2,
        probability: 18 / 37
    },
    [RouletteWinType.GREEN]: {
        payoutMultiplier: 36,
        probability: 1 / 37
    },
    [RouletteWinType.EVEN]: {
        payoutMultiplier: 2,
        probability: 18 / 37
    },
    [RouletteWinType.ODD]: {
        payoutMultiplier: 2,
        probability: 18 / 37
    },
    [RouletteWinType.LOW]: {
        payoutMultiplier: 2,
        probability: 18 / 37
    },
    [RouletteWinType.HIGH]: {
        payoutMultiplier: 2,
        probability: 18 / 37
    },
    [RouletteWinType.FIRST_DOZEN]: {
        payoutMultiplier: 3,
        probability: 12 / 37
    },
    [RouletteWinType.SECOND_DOZEN]: {
        payoutMultiplier: 3,
        probability: 12 / 37
    },
    [RouletteWinType.THIRD_DOZEN]: {
        payoutMultiplier: 3,
        probability: 12 / 37
    },
    [RouletteWinType.FIRST_COLUMN]: {
        payoutMultiplier: 3,
        probability: 12 / 37
    },
    [RouletteWinType.SECOND_COLUMN]: {
        payoutMultiplier: 3,
        probability: 12 / 37
    },
    [RouletteWinType.THIRD_COLUMN]: {
        payoutMultiplier: 3,
        probability: 12 / 37
    },
    [RouletteWinType.NUMBER]: {
        payoutMultiplier: 36,
        probability: 1 / 37
    }
};