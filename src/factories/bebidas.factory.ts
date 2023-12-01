import { Router } from "express";
import { environments } from "../config/dotenv";
import { BebidasController } from "../controllers/bebidas.controller";
import { BebidasRepoApi } from "../repositories/api/bebidas.repository";
import { BebidasRepoJsondb } from "../repositories/jsondb/bebidas.repository";
import { BebidasService } from "../services/bebidas.service";
import { BebidasRepoMongodb } from "../repositories/mongodb/bebidas.repository";

export const makeBebidas = () => {
  const router = Router();
  const controller = new BebidasController(
    new BebidasService(
      environments.repoLocation === "api"
        ? new BebidasRepoApi(): 
        environments.repoLocation === 'mongodb' 
        ? new BebidasRepoMongodb()
        : new BebidasRepoJsondb()
    )
  );
  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.delete("/", controller.delete);
  return router;
};
