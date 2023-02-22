import { Router } from "express";
import { environments } from "../config/dotenv";
import { BairrosController } from "../controllers/bairros.controller";
import { BairrosRepoApi } from "../repositories/api/bairros.repository";
import { BairrosRepoJsondb } from "../repositories/jsondb/bairros.repository";
import { BairrosService } from "../services/bairros.service";

export const makeBairros = () => {
  const router = Router();
  const controller = new BairrosController(
    new BairrosService(
      environments.repoLocation === "api"
        ? new BairrosRepoApi()
        : new BairrosRepoJsondb()
    )
  );
  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.delete("/", controller.delete);
  return router;
};
