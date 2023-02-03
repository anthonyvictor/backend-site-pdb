import { Router } from "express";
import { GruposController } from "../../controllers/pizzas/grupos.controller";
import { GruposRepoApi } from "../../repositories/api/pizzas/grupos.repository";
import { GruposService } from "../../services/pizzas/grupos.service";

export const makeGrupos = () => {
	const router = Router();
	const controller = new GruposController(
		new GruposService(new GruposRepoApi()),
	);
	router.get("/", controller.get);
	router.post("/", controller.post);
	router.patch("/", controller.patch);
	router.delete("/", controller.delete);
	return router;
};
