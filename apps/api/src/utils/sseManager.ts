import { Response } from "express";
import { prisma } from "@lib/prisma";

export let activeClients: Response[] = [];

export function broadcastStats(globalProfit: number, totalEntries: number) {
    const dataPayload = JSON.stringify({
        globalProfit,
        totalEntries
    });

    activeClients.forEach((client) => {
        client.write(`data: ${dataPayload}\n\n`);
    });
}

export async function streamGlobalStats() {
    const aggregations = await prisma.bets.aggregate({
        _sum: {
            profit: true,
        },
        _count: {
            _all: true,
        }
    });
    
    const totalGlobalProfit = aggregations._sum.profit || 0;
    const totalEntries = aggregations._count._all || 0;
    broadcastStats(totalGlobalProfit, totalEntries);
}