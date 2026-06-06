import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import { RouletteEngine } from "./games/roulette/engine/RouletteEngine";
import { RouletteWinType } from "./games/roulette/enums/RouletteWinTypes";
import { SpinRequestDto } from "./dto/SpinRequestDto";

const app = express();
const prisma = new PrismaClient();
const rouletteEngine = new RouletteEngine();

app.use(cors());
app.use(express.json());

app.post(
    "/roulette/spin",
    async (
        req: Request<{}, {}, SpinRequestDto>,
        res: Response
    ) => {
    try {
        const {betType, amountBet, userID} = req.body;
        if (betType === undefined || amountBet === undefined) {
            return res.status(400).json({
                error: "betType and amountBet are required"
            });
        }

        const result = rouletteEngine.spin(
            betType as RouletteWinType | number,
            Number(amountBet)
        );

        const savedSpin = await prisma.rouletteSpin.create({
            data: {
                betType: String(betType),
                amountBet,
                rolledNumber: result.rolledField.number,
                payoutMultiplier: result.payout,
                profit: amountBet * result.payout,
                user: userID | 0
            }
        });

        return res.status(200).json({
            spinId: savedSpin.id,
            rolledNumber: result.rolledField.number,
            payoutMultiplier: result.payout,
            profit: amountBet * result.payout
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to process spin"
        });
    }
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});