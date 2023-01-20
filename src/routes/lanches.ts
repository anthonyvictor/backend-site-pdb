import { Router } from "express";
import { db } from "../config/database";

const LanchesRoutes = Router();

LanchesRoutes.get("/", async (req, res) => {
	const dados = await db.getData("/lanches");
	res.send({ lanches: dados });
});

export default LanchesRoutes;
