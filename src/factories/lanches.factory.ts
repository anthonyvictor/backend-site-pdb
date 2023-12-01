import { Router } from "express";
import { environments } from "../config/dotenv";
import { LanchesController } from "../controllers/lanches.controller";
import { LanchesRepoApi } from "../repositories/api/lanches.repository";
import { LanchesRepoJsondb } from "../repositories/jsondb/lanches.repository";
import { LanchesService } from "../services/lanches.service";
import { LanchesRepoMongodb } from "../repositories/mongodb/lanches.repository";

export const makeLanches = () => {
  const router = Router();
  const controller = new LanchesController(
    new LanchesService(
      environments.repoLocation === "api"
        ? new LanchesRepoApi(): 
        environments.repoLocation === 'mongodb' 
        ? new LanchesRepoMongodb()
        : new LanchesRepoJsondb()
    )
  );
  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.delete("/", controller.delete);
  return router;
};
