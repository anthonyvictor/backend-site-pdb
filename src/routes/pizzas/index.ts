import { Router } from "express";
import { GruposRoutes } from "./grupos.routes";
import { SaboresRoutes } from "./sabores.routes";
import { TamanhosRoutes } from "./tamanhos.routes";

export const PizzasRoutes = Router();

PizzasRoutes.use("/sabores", SaboresRoutes);
PizzasRoutes.use("/tamanhos", TamanhosRoutes);
PizzasRoutes.use("/grupos", GruposRoutes);
