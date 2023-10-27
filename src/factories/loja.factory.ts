import { Router } from "express";
import { LojaController } from "../controllers/loja.controller";
import { LojaRepoMongodb } from "../repositories/mongodb/loja.repository";
import { LojaService } from "../services/loja.service";

export const makeLoja = () => {
  const router = Router();
  const repo = new LojaRepoMongodb()
  const controller = new LojaController(
    new LojaService(repo)
  );
  router.get("/", controller.get);
  // router.post("/", controller.post);
  router.patch("/", controller.patch);
  // router.delete("/", controller.delete);

  setInterval(() => {
    repo.delete('')
  }, 5 * 60 * 1000)
  return router;
};
