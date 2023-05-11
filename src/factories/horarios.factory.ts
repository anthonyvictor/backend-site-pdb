import { Router } from "express";
import { environments } from "../config/dotenv";
import { HorariosController } from "../controllers/horarios.controller";
import { HorariosRepoApi } from "../repositories/api/horarios.repository";
import { HorariosRepoJsondb } from "../repositories/jsondb/horarios.repository";
import { HorariosService } from "../services/horarios.service";

export const makeHorarios = () => {
  const router = Router();
  const controller = new HorariosController(
    new HorariosService(
      environments.repoLocation === "api"
        ? new HorariosRepoApi()
        : new HorariosRepoJsondb()
    )
  );
  router.get("/", controller.get);

  return router;
};
