import { Router } from "express";
import { environments } from "../config/dotenv";
import { PromoController } from "../controllers/promo.controller";
import { PromoRepoApi } from "../repositories/api/promo.repository";
import { PromoRepoJsondb } from "../repositories/jsondb/promo.repository";
import { PromoService } from "../services/promo.service";
import { PromoRepoMongodb } from "../repositories/mongodb/promo.repository";

export const makePromo = () => {
  const router = Router();
  const controller = new PromoController(
    new PromoService(
      environments.repoLocation === "api"
        ? new PromoRepoApi()
        : environments.repoLocation === "mongodb"
        ? new PromoRepoMongodb()
        : new PromoRepoJsondb()
    )
  );
  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.delete("/", controller.delete);
  return router;
};
