import { z } from "zod";
import {RouletteWinType} from "../enums/RouletteWinTypes";

export const RouletteSpinResponseSchema = z.object({
    spinId: z.number(),
    rolledNumber: z.number().int().min(0).max(36),
    payoutMultiplier: z.number(),
    profit: z.number()
});

export type RouletteSpinResponseDto = z.infer<typeof RouletteSpinResponseSchema>;