import { Request, Response } from "express";
import {
	tamanhosRepository,
	updateTamanho,
} from "../../repositories/pizzas/tamanhos.repository";
import { IPizzaTamanho } from "../../types/pizza";

export const getTamanhos = async (req: Request, res: Response) => {
	try {
		const tamanhos = await tamanhosRepository("localdb");
		res.send({ tamanhos });
	} catch (e) {
		console.error(e);
		res.send({ message: "Error" });
	}
};

export const patchTamanhos = async (req: Request, res: Response) => {
	try {
		const tamanho = req.body as IPizzaTamanho;
		await updateTamanho(tamanho, "localdb");
		res.sendStatus(200);
	} catch (e) {
		console.error(e);
		res.status(500).send("Não foi possível salvar");
	}
};
