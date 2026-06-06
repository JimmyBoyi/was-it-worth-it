import {RouletteWinType} from "../games/roulette/enums/RouletteWinTypes";

export interface SpinRequestDto {
    betType: RouletteWinType | number;
    amountBet: number;
    userID: number;
}