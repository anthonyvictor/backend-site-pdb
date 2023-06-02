import { Router } from "express";
import { PedidosController } from "../controllers/pedidos.controller";
import { PedidosRepoMongodb } from "../repositories/mongodb/pedidos.repository";
import { PedidosService } from "../services/pedidos.service";

export const makePedidos = () => {
  const router = Router();
  const controller = new PedidosController(
    new PedidosService(new PedidosRepoMongodb())
  );
  router.get("/", controller.get);
  router.post("/", controller.post);
  router.patch("/", controller.patch);
  router.delete("/", controller.delete);
  return router;
};
