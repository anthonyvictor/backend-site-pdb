import { Router } from "express";
import { LanchesController } from "../controllers/lanches.controller";
import { LanchesRepoApi } from "../repositories/api/lanches.repository";
import { LanchesService } from "../services/lanches.service";

export const makeLanches = () => {
	const router = Router();
	const controller = new LanchesController(
		new LanchesService(new LanchesRepoApi()),
	);
	router.get("/", controller.get);
	router.post("/", controller.post);
	router.patch("/", controller.patch);
	router.delete("/", controller.delete);
	return router;
};
