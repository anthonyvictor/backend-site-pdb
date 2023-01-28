import express from "express";

import BebidasRoutes from "./bebidas.routes";
import SaboresRoutes from "./pizzas/sabores.routes";
import TamanhosRoutes from "./pizzas/tamanhos.routes";
import LanchesRoutes from "./lanches.routes";
import TaxaRoutes from "./taxa.routes";
import EnderecosRoutes from "./enderecos.routes";
import BairrosRoutes from "./bairros.routes";
import AuthRoutes from "./auth.routes";

const routes = express();

routes.use("/auth", AuthRoutes);

routes.use("/pizzas/sabores", SaboresRoutes);
routes.use("/pizzas/tamanhos", TamanhosRoutes);

routes.use("/bebidas", BebidasRoutes);
routes.use("/lanches", LanchesRoutes);

routes.use("/taxa", TaxaRoutes);
routes.use("/enderecos", EnderecosRoutes);
routes.use("/bairros", BairrosRoutes);

routes.use("/", (req, res) => res.send({ message: "Site ON" }));

export default routes;
