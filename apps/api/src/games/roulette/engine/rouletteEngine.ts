import {RouletteField} from "../models/RouletteField";
import {RouletteBetDefinitions, RouletteBetDefinitionType} from "../data/RouletteBetDefinitions";
import {RouletteWinType} from "../enums/RouletteWinTypes";
import {rouletteWheel} from "../data/rouletteWheel";

export type RouletteEngineSpinResult = {
    payout: number;
    probability: number;
    rolledField: RouletteField;
};

export class RouletteEngine {
    public spin(betType: RouletteWinType | number, amountBet: number): RouletteEngineSpinResult{
        let result = this.simulateSpin();
        let betDefinition = this.evaluateBet(betType, result);
        return { payout: amountBet * betDefinition.payoutMultiplier, probability: betDefinition.probability, rolledField: result };
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
            : {payoutMultiplier: -1, probability: definitionType.probability};
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
