import {RouletteSpinRequestDto} from "@shared/schemas/RouletteSpinRequestSchema";
import {RouletteWinType} from "@shared/enums/RouletteWinTypes";

export async function spinRoulette(betType: RouletteWinType | number, amountBet: number) {
    const requestBody: RouletteSpinRequestDto = {betType: betType, amountBet: amountBet, userId: "1ABC"}
    const res = await fetch("http://localhost:3001/api/roulette/spin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
        throw new Error("Spin failed");
    }

    return res.json();
}