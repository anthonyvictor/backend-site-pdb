import { Router } from "express";
import { TaxaController } from "../controllers/taxa.controller";
import { makeTaxa } from "../factories/taxa.factory";
import { EnderecosRepoApi } from "../repositories/api/enderecos.repository";
import { TaxaService } from "../services/taxa.service";

export const TaxaRoutes = makeTaxa();

// const router = Router();
// const controller = new TaxaController(new TaxaService(new EnderecosRepoApi()));
// router.get("/", controller.get);
// router.post("/", controller.post);
// router.patch("/", controller.patch);
// router.delete("/", controller.delete);

// export const TaxaRoutes = router;
