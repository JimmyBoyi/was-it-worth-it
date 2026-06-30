import {RouletteField} from "../models/RouletteField";
import {RouletteBetDefinitions, RouletteBetDefinitionType} from "../data/RouletteBetDefinitions";
import {RouletteWinType} from "@shared/enums/RouletteWinTypes";
import {rouletteWheel} from "../data/rouletteWheel";
import {RouletteBet} from "@shared/types/roulette";

export type RouletteEngineSpinResult = {
    profit: number,
    payout: number;
    rolledField: RouletteField;
    totalAmountBet: number;
};

export class RouletteEngine {
    public spin(incomingBets: RouletteBet | RouletteBet[]): RouletteEngineSpinResult {
        const bets = Array.isArray(incomingBets) ? incomingBets : [incomingBets];
    
        let result = this.simulateSpin();
        let totalPayout = 0;
        let totalAmountBet = 0;
    
        bets.forEach((bet: RouletteBet) => {
            let betDefinition = this.evaluateBet(bet.type, result);
            totalPayout += bet.amount * betDefinition.payoutMultiplier;
            totalAmountBet += bet.amount;
        });
        return { profit: totalPayout - totalAmountBet, payout: totalPayout, rolledField: result, totalAmountBet: totalAmountBet };
    }
    
    private simulateSpin(): RouletteField{
        let rolledField = Math.floor(Math.random() * 37);
        return rouletteWheel[rolledField]
    }

    private evaluateBet(betType: RouletteWinType | number, rolledField: RouletteField): RouletteBetDefinitionType {
        const isNumberBet = typeof betType === "number";
        let isWin;
        
        if (isNumberBet) {
            isWin = rolledField.number === Number(betType);
        } else {
            isWin = rolledField.possibleWinList.includes(betType as RouletteWinType);
        }
        
        let definitionType = this.getBetDefinition(betType, isNumberBet);

        return isWin
            ? definitionType
            : {payoutMultiplier: 0, probability: definitionType.probability};
    }
    
    private getBetDefinition(betType: RouletteWinType | number, isNumberBet: boolean): RouletteBetDefinitionType{
        let enumValue: RouletteWinType;

        if (isNumberBet) {
            enumValue = "number" as RouletteWinType
        } else {
            enumValue = betType as RouletteWinType;
            const matchedDefinition = RouletteBetDefinitions[enumValue];
            if (!matchedDefinition) {
                throw new Error(`Invalid bet type provided: ${betType}`);
            }
        }
        return RouletteBetDefinitions[enumValue];
    }
}
