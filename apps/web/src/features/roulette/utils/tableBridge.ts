import { RouletteBet } from "@shared/types/roulette";

type BetCompiler = () => RouletteBet[];
let activeCompiler: BetCompiler | null = null;

export function registerTableCompiler(compiler: BetCompiler) {
    activeCompiler = compiler;
}

export function getCompiledBets(): RouletteBet[] {
    if (!activeCompiler) {
        console.warn("RouletteTable is not mounted yet.");
        return [];
    }
    return activeCompiler();
}