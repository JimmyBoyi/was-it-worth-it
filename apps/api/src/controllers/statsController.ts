import { Request, Response } from "express";
import {activeClients, streamGlobalStats} from "../utils/sseManager";

async function pushStatsWhenFirstConnecting(){
    try {
        await streamGlobalStats();
    } catch (error) {
        console.error("Failed to send initial SSE stats:", error);
    }
}

export function getLiveStats (req: Request, res: Response) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    activeClients.push(res);

    pushStatsWhenFirstConnecting();
    req.on("close", () => {
        const index = activeClients.indexOf(res);
        if (index !== -1) {
            activeClients.splice(index, 1);
        }
    });
}