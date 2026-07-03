import { Router } from "express";
import { handleSpin } from "../controllers/rouletteController";

const rouletteRouter = Router();

rouletteRouter.post("/spin", handleSpin);

export default rouletteRouter;