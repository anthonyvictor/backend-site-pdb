import { Router } from "express";
import {
	getBebidas,
	patchBebidas,
	postBebidas,
} from "../services/bebidas.service";

const BebidaRoutes = Router();

BebidaRoutes.get("/", getBebidas);

BebidaRoutes.patch("/", patchBebidas);

BebidaRoutes.post("/", postBebidas);

export default BebidaRoutes;
