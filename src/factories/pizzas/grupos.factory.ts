import { Router } from "express";
import { environments } from "../../config/dotenv";
import { GruposController } from "../../controllers/pizzas/grupos.controller";
import { GruposRepoApi } from "../../repositories/api/pizzas/grupos.repository";
import { GruposRepoJsondb } from "../../repositories/jsondb/pizzas/grupos.repository";
import { GruposService } from "../../services/pizzas/grupos.service";

export const makeGrupos = () => {
  const router = Router();
  const controller = new GruposController(
    new GruposService(
      environments.repoLocation === "api"
        ? new GruposRepoApi()
        : new GruposRepoJsondb()
    )
  );
  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.delete("/", controller.delete);
  return router;
};
