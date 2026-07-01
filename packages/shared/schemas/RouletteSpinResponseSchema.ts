import { z } from "zod";
import {RouletteWinType} from "../enums/RouletteWinTypes";

export const RouletteSpinResponseSchema = z.object({
    spinId: z.string(),
    rolledNumber: z.number().int().min(0).max(36),
    profit: z.number(),
    payout: z.number(),
});

export type RouletteSpinResponseDto = z.infer<typeof RouletteSpinResponseSchema>;