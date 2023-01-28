import { Request, Response } from "express";
import {
	bebidasRepository,
	updateBebida,
	insertBebida,
} from "../repositories/bebidas.repository";
import { IOutro } from "../types/outro";

export const getBebidas = async (req: Request, res: Response) => {
	try {
		let bebidas: IOutro[] = [];
		bebidas = (await bebidasRepository("localdb")).sort((a, b) =>
			a.nome > b.nome ? 1 : -1,
		);

		res.send({ bebidas });
	} catch (e: any) {
		console.error(e["message"]);
		res.send({ message: "Error" });
	}
};

export const patchBebidas = async (req: Request, res: Response) => {
	try {
		const bebidas = await bebidasRepository("localdb");
		const bebida = req.body as IOutro;
		if (JSON.stringify(bebidas).includes(bebida.nome)) {
			await updateBebida(bebida, "localdb");
			res.sendStatus(200);
		} else {
			res.status(404).send("Não encontrado");
		}
	} catch (e) {
		console.error(e);
		res.status(500).send("Não foi possível salvar");
	}
};

export const postBebidas = async (req: Request, res: Response) => {
	try {
		const bebidas = await bebidasRepository("localdb");
		const bebida = req.body as IOutro;

		let novosDados: Array<IOutro> = [];

		if (JSON.stringify(bebidas).includes(bebida.nome)) {
			novosDados = (bebidas as Array<IOutro>).map(t =>
				t.nome === bebida.nome ? bebida : t,
			);
			res.status(404).send("Dado já existe");
		} else {
			await insertBebida(bebida, "localdb");
			res.sendStatus(200);
		}
	} catch (e) {
		console.error(e);
		res.status(500).send("Não foi possível salvar");
	}
};
