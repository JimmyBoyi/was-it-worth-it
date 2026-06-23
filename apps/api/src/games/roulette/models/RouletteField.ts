import {RouletteWinType} from "@shared/enums/RouletteWinTypes";

export class RouletteField {
    constructor(
        public number: number,
        public possibleWinList: RouletteWinType[]
    ) {}
}