import {RouletteWinType} from "../enums/RouletteWinTypes";

export interface RouletteBet {
    type: RouletteWinType | number;
    amount: number;
}