import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
});
import express from "express";
import cors from "cors";
import rouletteRouter from "./routes/rouletteRoutes";
import statsRouter from "./routes/statsRoutes";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());

app.use("/api/roulette", rouletteRouter);
app.use("/api/stats", statsRouter);

app.listen(3001, "0.0.0.0", () => {
    console.log("Server running on IPv4 port 3001");
});