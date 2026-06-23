import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
});
console.log("LOADED");
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { RouletteEngine } from "@games/roulette/engine/rouletteEngine";
import { RouletteWinType } from "@shared/enums/RouletteWinTypes";
import {prisma} from "@lib/prisma";
import {GameType} from "./generated/prisma/enums";
import {RouletteSpinRequestDto} from "@shared/schemas/RouletteSpinRequestSchema";
import {activeClients, broadcastStats} from "./utils/sseManager";

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
    console.log(`👥 Client connected to SSE. Total active: ${activeClients.length}`);

    req.on("close", () => {
        const index = activeClients.indexOf(res);
        if (index !== -1) {
            activeClients.splice(index, 1);
        }
        console.log(`👤 Client disconnected from SSE. Total remaining: ${activeClients.length}`);
    });
});

app.post(
    "/api/roulette/spin",
    async (
        req: Request<{}, {}, RouletteSpinRequestDto>,
        res: Response
    ) => {
    try {
        console.log("bru: ", process.cwd());
        console.log("DB URL:", process.env.DATABASE_URL);
        const {betType, amountBet, userId} = req.body;
        console.log("Type: " + betType + " | Amound Bet: " + amountBet + " | userId: " + userId);
        if (betType === undefined || amountBet === undefined) {
            return res.status(400).json({
                error: "betType and amountBet are required"
            });
        }
        console.log("Z");
        const result = rouletteEngine.spin(
            betType as RouletteWinType | number,
            Number(amountBet)
        );

        let userIdOrZero = userId === undefined ? "0" : userId;
        console.log("A");

        const data = {
            userId: userIdOrZero,
            gameType: GameType.ROULETTE,
            betAmount: amountBet,
            profit: result.profit,
            details: {
                rolledField: result.rolledField.number,
                payout: result.payout
            }
        };

        console.log("B", data);

        const savedSpin = await prisma.bets.create({data});
        
        const aggregations = await prisma.bets.aggregate({
            _sum: {
                profit: true,
            },
        });
        const totalGlobalProfit = aggregations._sum.profit || 0;
        broadcastStats(totalGlobalProfit);

        console.log("C");

        const fieldColour = result.rolledField.possibleWinList.includes(RouletteWinType.RED) ? 
            RouletteWinType.RED : result.rolledField.possibleWinList.includes(RouletteWinType.BLACK) ? 
                RouletteWinType.BLACK : RouletteWinType.GREEN
        
        return res.status(200).json({
            spinId: savedSpin.id,
            rolledNumber: result.rolledField.number,
            colour: fieldColour,
            profit: result.profit,
            payout: result.payout,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to process spin"
        });
    }
});

app.listen(3001, "0.0.0.0", () => {
    console.log("Server absolutely running on IPv4 port 3001");
});