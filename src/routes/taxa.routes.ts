import { Router } from "express";
import { getTaxa } from "../services/taxa.service";

const TaxaRoutes = Router();

TaxaRoutes.get("/", getTaxa);

export default TaxaRoutes;
