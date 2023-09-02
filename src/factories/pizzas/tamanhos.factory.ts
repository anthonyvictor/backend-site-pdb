import { Router } from "express";
import { environments } from "../../config/dotenv";
import { TamanhosController } from "../../controllers/pizzas/tamanhos.controller";
import { SaboresRepoApi } from "../../repositories/api/pizzas/sabores.repository";
import { TamanhosRepoApi } from "../../repositories/api/pizzas/tamanhos.repository";
import { SaboresRepoJsondb } from "../../repositories/jsondb/pizzas/sabores.repository";
import { TamanhosRepoJsondb } from "../../repositories/jsondb/pizzas/tamanhos.repository";
import { TamanhosService } from "../../services/pizzas/tamanhos.service";

export const makeTamanhos = () => {
  const router = Router();
  const controller = new TamanhosController(
    new TamanhosService(
      environments.repoLocation === "api"
        ? new TamanhosRepoApi()
        : new TamanhosRepoJsondb(),
      environments.repoLocation === "api"
        ? new SaboresRepoApi()
        : new SaboresRepoJsondb()
    )
  );
  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.delete("/", controller.delete);
  return router;
};
