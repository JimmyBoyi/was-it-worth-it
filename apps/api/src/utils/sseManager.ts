import { Response } from "express";

export let activeClients: Response[] = [];

export function broadcastStats(globalProfit: number) {
    const dataPayload = JSON.stringify({ globalProfit });

    activeClients.forEach((client) => {
        client.write(`data: ${dataPayload}\n\n`);
    });
}