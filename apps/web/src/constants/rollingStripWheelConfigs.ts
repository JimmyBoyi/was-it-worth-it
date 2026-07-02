import {GameType} from "@shared/enums/GameTypes";

export interface WheelConfig {
    wheelContent: string[];
    tileWidth: number;
    viewportWidth: number;
    spins: number;
    elementSelector: string;
}

const ROULETTE_NUMBERS = [
    '0', '32', '15', '19', '4', '21', '2', '25', '17', '34', '6', '27', '13', '36', '11', '30', '8', '23', '10', '5', '24', '16', '33', '1', '20', '14', '31', '9', '22', '18', '29', '7', '28', '12', '35', '3', '26'
];

export const WHEEL_CONFIGS: Record<GameType, WheelConfig> = {
    ROULETTE: {
        wheelContent: ROULETTE_NUMBERS,
        tileWidth: 80,
        viewportWidth: 600,
        spins: 5,
        elementSelector: 'roulette-strip-animateable'
    },
};