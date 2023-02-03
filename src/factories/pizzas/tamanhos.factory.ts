import { Router } from "express";
import { TamanhosController } from "../../controllers/pizzas/tamanhos.controller";
import { TamanhosRepoApi } from "../../repositories/api/pizzas/tamanhos.repository";
import { TamanhosService } from "../../services/pizzas/tamanhos.service";

export const makeTamanhos = () => {
	const router = Router();
	const controller = new TamanhosController(
		new TamanhosService(new TamanhosRepoApi()),
	);
	router.get("/", controller.get);
	router.post("/", controller.post);
	router.patch("/", controller.patch);
	router.delete("/", controller.delete);
	return router;
};
