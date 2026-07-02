import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({
    user: 'FullstackWebDevEnjoyerOfDevelopingSoftware',
    password: 'CleanSoftwareBuiltScalableLR95',
    host: 'localhost',
    port: 5456,
    database: 'is_it_worth_it',
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });