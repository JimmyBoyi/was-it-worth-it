import { z } from "zod";
import {RouletteWinType} from "../enums/RouletteWinTypes";

export const RouletteSpinRequestSchema = z.object({
    betType: z.union([
        z.enum(RouletteWinType),
        z.number().int().min(0).max(36)
    ]),
    amountBet: z.number().positive(),
    userId: z.string()
});

export type RouletteSpinRequestDto = z.infer<typeof RouletteSpinRequestSchema>;