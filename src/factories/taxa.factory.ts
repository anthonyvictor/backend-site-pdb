import { Router } from "express";
import { TaxaController } from "../controllers/taxa.controller";
import { EnderecosRepoApi } from "../repositories/api/enderecos.repository";
import { TaxaRepoApi } from "../repositories/api/taxa.repository";
import { TaxaService } from "../services/taxa.service";

export const makeTaxa = () => {
	const router = Router();
	const controller = new TaxaController(
		new TaxaService(new TaxaRepoApi(), new EnderecosRepoApi()),
	);
	router.get("/", controller.get);
	router.post("/", controller.post);
	router.patch("/", controller.patch);
	router.delete("/", controller.delete);
	return router;
};
