import express from "express";

import AuthRoutes from "./auth.routes";

import { PizzasRoutes } from "./pizzas";
import { BebidasRoutes } from "./bebidas.routes";
import { LanchesRoutes } from "./lanches.routes";

import { EnderecosRoutes } from "./enderecos.routes";
import { BairrosRoutes } from "./bairros.routes";
import { TaxaRoutes } from "./taxa.routes";

// import { HorariosRoutes } from "./horarios.routes";
import { PedidosRoutes } from "./pedidos.routes";
import { LojaRoutes } from "./loja.routes";

const routes = express();

routes.use("/auth", AuthRoutes);

routes.use("/pizzas", PizzasRoutes);
routes.use("/bebidas", BebidasRoutes);
routes.use("/lanches", LanchesRoutes);

routes.use("/enderecos", EnderecosRoutes);
routes.use("/bairros", BairrosRoutes);
routes.use("/taxa", TaxaRoutes);

// routes.use("/horarios", HorariosRoutes);
routes.use("/pedidos", PedidosRoutes);
routes.use("/loja", LojaRoutes);

routes.use("/", (req, res) => res.json({ message: "Site ON" }));

export default routes;
