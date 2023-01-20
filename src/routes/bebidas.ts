import { Router } from "express";

const BebidasRoutes = Router();

BebidasRoutes.get("/", async (req, res) => {
	res.send({ message: "bebidas" });
});

export default BebidasRoutes;
