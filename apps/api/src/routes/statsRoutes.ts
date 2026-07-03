import { Router } from "express";
import { getLiveStats } from "../controllers/statsController";

const statsRouter = Router();

statsRouter.get("/live-stats", getLiveStats);

export default statsRouter;