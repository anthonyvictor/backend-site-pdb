import { Router } from "express";
import {
	getSabores,
	patchSabores,
	postSabores,
} from "../../services/pizzas/sabores.service";

const SaboresRoutes = Router();

SaboresRoutes.get("/", getSabores);

SaboresRoutes.patch("/", patchSabores);

SaboresRoutes.post("/", postSabores);

export default SaboresRoutes;
