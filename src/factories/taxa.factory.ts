import { Router } from "express";
import { environments } from "../config/dotenv";
import { TaxaController } from "../controllers/taxa.controller";
import { EnderecosRepoApi } from "../repositories/api/enderecos.repository";
import { EnderecosRepoJsondb } from "../repositories/jsondb/enderecos.repository";
import { TaxaService } from "../services/taxa.service";

export const makeTaxa = () => {
  const router = Router();
  const controller = new TaxaController(
    new TaxaService(
      environments.repoLocation === "api"
        ? new EnderecosRepoApi()
        : new EnderecosRepoJsondb()
    )
  );
  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.delete("/", controller.delete);
  return router;
};
