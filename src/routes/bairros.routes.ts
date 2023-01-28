import { Router } from "express";
import { getBairros } from "../services/bairros.service";

const BairrosRoutes = Router();

BairrosRoutes.get("/", (req, res) => getBairros(req, res));

export default BairrosRoutes;
