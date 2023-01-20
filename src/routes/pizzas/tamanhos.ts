import { Router } from "express";
import { db } from "../../config/database";

const TamanhosRoutes = Router();

TamanhosRoutes.get("/", async (req, res) => {
	const dados = await db.getData("/pizzas/tamanhos");
	res.send({ tamanhos: dados });
});

export default TamanhosRoutes;
