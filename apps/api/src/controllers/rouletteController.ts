import { Request, Response } from "express";
import {prisma} from "@lib/prisma";
import {RouletteSpinRequestDto} from "@shared/schemas/RouletteSpinRequestSchema";
import {RouletteSpinResponseDto} from "@shared/schemas/RouletteSpinResponseSchema";
import {RouletteBet} from "@shared/types/roulette";
import {GameType} from "../generated/prisma/enums";
import {streamGlobalStats} from "../utils/sseManager";
import {RouletteEngine} from "@games/roulette/engine/rouletteEngine";

const rouletteEngine = new RouletteEngine();

export async function handleSpin(
        req: Request<{}, {}, RouletteSpinRequestDto>,
        res: Response
    ) {
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
    }