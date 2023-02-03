import { Router } from "express";
import { BebidasController } from "../controllers/bebidas.controller";
import { BebidasRepoApi } from "../repositories/api/bebidas.repository";
import { BebidasService } from "../services/bebidas.service";

export const makeBebidas = () => {
	const router = Router();
	const controller = new BebidasController(
		new BebidasService(new BebidasRepoApi()),
	);
	router.get("/", controller.get);
	router.post("/", controller.post);
	router.patch("/", controller.patch);
	router.delete("/", controller.delete);
	return router;
};
