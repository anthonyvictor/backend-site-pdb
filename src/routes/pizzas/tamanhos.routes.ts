import { Router } from "express";
import {
	getTamanhos,
	patchTamanhos,
} from "../../services/pizzas/tamanhos.service";

const TamanhosRoutes = Router();

TamanhosRoutes.get("/", getTamanhos);

TamanhosRoutes.patch("/", patchTamanhos);
export default TamanhosRoutes;
