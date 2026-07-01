import { z } from "zod";

const IndividualBetSchema = z.object({
    type: z.union([
        z.string(),
        z.number().int().min(0).max(36)
    ]),
    amount: z.number().int().positive().max(50),
});

export const RouletteSpinRequestSchema = z.object({
    userId: z.string().uuid(),
    bets: z.union([
        IndividualBetSchema,
        z.array(IndividualBetSchema)
    ])
});

export type RouletteSpinRequestDto = z.infer<typeof RouletteSpinRequestSchema>;