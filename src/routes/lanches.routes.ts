import { Router } from "express";
import {
	getLanches,
	patchLanches,
	postLanches,
} from "../services/lanches.service";

const LanchesRoutes = Router();

LanchesRoutes.get("/", getLanches);

LanchesRoutes.patch("/", patchLanches);

LanchesRoutes.post("/", postLanches);

export default LanchesRoutes;
