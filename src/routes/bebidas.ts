import { Router } from "express";
import { db } from "../config/database";

const BebidasRoutes = Router();

BebidasRoutes.get("/", async (req, res) => {
	const dados = await db.getData("/bebidas");
	res.send({ bebidas: dados });
});

export default BebidasRoutes;
