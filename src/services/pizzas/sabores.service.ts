import { Request, Response } from "express";
import {
	saboresRepository,
	updateSabor,
	insertSabor,
} from "../../repositories/pizzas/sabores.repository";
import { IPizzaSabor } from "../../types/pizza";

export const getSabores = async (req: Request, res: Response) => {
	try {
		const grupos = await saboresRepository("localdb");
		res.send({ grupos });
	} catch (e) {
		console.error(e);
		res.send({ message: "Error" });
	}
};

export const patchSabores = async (req: Request, res: Response) => {
	try {
		const sabor = req.body as IPizzaSabor;
		await updateSabor(sabor, "localdb");
		res.sendStatus(200);
	} catch (e) {
		console.error(e);
		res.status(500).send("Não foi possível salvar");
	}
};

export const postSabores = async (req: Request, res: Response) => {
	try {
		const { sabor, grupo } = req.body as { sabor: IPizzaSabor; grupo: string };
		await insertSabor(sabor, grupo, "localdb");
		res.sendStatus(200);
	} catch (e) {
		console.error(e);
		res.status(500).send("Não foi possível salvar");
	}
};
