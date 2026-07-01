import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
});
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { RouletteEngine } from "@games/roulette/engine/rouletteEngine";
import {prisma} from "@lib/prisma";
import {GameType} from "./generated/prisma/enums";
import {RouletteSpinRequestDto} from "@shared/schemas/RouletteSpinRequestSchema";
import {activeClients, streamGlobalStats} from "./utils/sseManager";
import {RouletteSpinResponseDto} from "@shared/schemas/RouletteSpinResponseSchema";
import {RouletteBet} from "@shared/types/roulette";

const app = express();
const rouletteEngine = new RouletteEngine();

app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());

app.get("/api/roulette/live-stats", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    activeClients.push(res);
    console.log(`Client connected to SSE. Total active: ${activeClients.length}`);

    req.on("close", () => {
        const index = activeClients.indexOf(res);
        if (index !== -1) {
            activeClients.splice(index, 1);
        }
        console.log(`Client disconnected from SSE. Total remaining: ${activeClients.length}`);
    });
});

app.post(
    "/api/roulette/spin",
    async (
        req: Request<{}, {}, RouletteSpinRequestDto>,
        res: Response
    ) => {
    try {
        const {bets, userId} = req.body;
        if (bets === undefined) {
            return res.status(400).json({
                error: "betType and amountBet are required"
            });
        }
        
        const result = rouletteEngine.spin(bets as RouletteBet[]);

        let userIdOrZero = userId === undefined ? "0" : userId;

        const data = {
            userId: userIdOrZero,
            gameType: GameType.ROULETTE,
            betAmount: result.totalAmountBet,
            profit: result.profit,
            details: {
                rolledField: result.rolledField.number,
                payout: result.payout
            }
        };

        const savedSpin = await prisma.bets.create({data});
        await streamGlobalStats();
        
        const response: RouletteSpinResponseDto = {
            spinId: savedSpin.id,
            rolledNumber: result.rolledField.number,
            profit: result.profit,
            payout: result.payout,
        }
        return res.status(200).json(response);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to process spin"
        });
    }
});

app.listen(3001, "0.0.0.0", () => {
    console.log("Server running on IPv4 port 3001");
});