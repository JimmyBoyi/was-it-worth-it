import {RouletteSpinRequestDto} from "@shared/schemas/RouletteSpinRequestSchema";
import {RouletteBet} from "@shared/types/roulette";

export async function spinRoulette(bets: RouletteBet[]) {
    console.log(bets);
    const requestBody: RouletteSpinRequestDto = {bets, userId: "1ABC"}
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