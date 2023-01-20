import { Router } from "express";
import { db } from "../../config/database";

const SaboresRoutes = Router();

SaboresRoutes.get("/", async (req, res) => {
	const dados = await db.getData("/pizzas/sabores-grupos");
	res.send({ grupos: dados });
});

export default SaboresRoutes;
