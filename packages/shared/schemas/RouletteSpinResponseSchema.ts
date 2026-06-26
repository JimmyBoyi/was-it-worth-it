import { z } from "zod";
import {RouletteWinType} from "../enums/RouletteWinTypes";

export const RouletteSpinResponseSchema = z.object({
    spinId: z.string(),
    rolledNumber: z.number().int().min(0).max(36),
    probability: z.number(),
    profit: z.number(),
    payout: z.number(),
});

export type RouletteSpinResponseDto = z.infer<typeof RouletteSpinResponseSchema>;