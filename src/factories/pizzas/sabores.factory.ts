import { Router } from "express";
import { SaboresController } from "../../controllers/pizzas/sabores.controller";
import { GruposRepoApi } from "../../repositories/api/pizzas/grupos.repository";
import { SaboresRepoApi } from "../../repositories/api/pizzas/sabores.repository";
import { SaboresService } from "../../services/pizzas/sabores.service";

export const makeSabores = () => {
	const router = Router();
	const controller = new SaboresController(
		new SaboresService(new SaboresRepoApi(), new GruposRepoApi()),
	);
	router.get("/", controller.get);
	router.post("/", controller.post);
	router.patch("/", controller.patch);
	router.delete("/", controller.delete);
	return router;
};
