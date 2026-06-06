import {RouletteWinType} from "../enums/RouletteWinTypes";

export class RouletteField {
    constructor(
        public number: number,
        public possibleWinList: RouletteWinType[]
    ) {}
}