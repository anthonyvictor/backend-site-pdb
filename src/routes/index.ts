import express from "express";

import BebidasRoutes from "./bebidas";
import SaboresRoutes from "./pizzas/sabores";
import TamanhosRoutes from "./pizzas/tamanhos";
import LanchesRoutes from "./lanches";

const routes = express();

routes.use("/bebidas", BebidasRoutes);

routes.use("/pizzas/sabores", SaboresRoutes);
routes.use("/pizzas/tamanhos", TamanhosRoutes);

routes.use("/lanches", LanchesRoutes);

routes.use("/", (req, res) => res.send("<h1>Olá mundo</h1>"));

export default routes;
