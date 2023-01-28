import { Router } from "express";
import { getAuth } from "../services/auth.service";

const AuthRoutes = Router();

AuthRoutes.post("/", getAuth);

export default AuthRoutes;
