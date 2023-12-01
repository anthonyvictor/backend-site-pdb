import { Router } from "express";
import { environments } from "../config/dotenv";
import { EnderecosController } from "../controllers/enderecos.controller";
import { EnderecosRepoApi } from "../repositories/api/enderecos.repository";
import { EnderecosRepoJsondb } from "../repositories/jsondb/enderecos.repository";
import { EnderecosService } from "../services/enderecos.service";
import { EnderecosRepoMongodb } from "../repositories/mongodb/enderecos.repository";

export const makeEnderecos = () => {
  const router = Router();
  const controller = new EnderecosController(
    new EnderecosService(
      environments.repoLocation === "api"
        ? new EnderecosRepoApi(): 
        environments.repoLocation === 'mongodb' 
        ? new EnderecosRepoMongodb()
        : new EnderecosRepoJsondb()
    )
  );
  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.delete("/", controller.delete);
  return router;
};
