import { Router } from "express";
import { environments } from "../../config/dotenv";
import { SaboresController } from "../../controllers/pizzas/sabores.controller";
import { GruposRepoApi } from "../../repositories/api/pizzas/grupos.repository";
import { SaboresRepoApi } from "../../repositories/api/pizzas/sabores.repository";
import { GruposRepoJsondb } from "../../repositories/jsondb/pizzas/grupos.repository";
import { SaboresRepoJsondb } from "../../repositories/jsondb/pizzas/sabores.repository";
import { SaboresService } from "../../services/pizzas/sabores.service";

export const makeSabores = () => {
  const router = Router();
  const controller = new SaboresController(
    new SaboresService(
      environments.repoLocation === "api"
        ? new SaboresRepoApi()
        : new SaboresRepoJsondb(),
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
