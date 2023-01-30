import { Request, Response } from "express";
import { ILanche, Lanche } from "../models/Lanche";
import {
	lanchesRepository,
	updateLanche,
	insertLanche,
} from "../repositories/lanches.repository";
import { IOutro } from "../types/outro";
import { lanches } from "../cache";

export const getLanches = async (req: Request, res: Response) => {
	try {
		console.log(lanches);
		// let lanches: IOutro[] = [];
		// lanches = (await lanchesRepository("localdb")).sort((a, b) =>
		await lanchesRepository("mongo");
		// 	a.nome > b.nome ? 1 : -1,
		// );

		res.send({ lanches });
	} catch (e: any) {
		console.error(e["message"]);
		res.send({ message: "Error" });
	}
};

export const patchLanches = async (req: Request, res: Response) => {
	try {
		const lanche = req.body as ILanche;
		Lanche.updateOne({ _id: lanche._id });
		// const lanches = await lanchesRepository("localdb");
		// const lanche = req.body as IOutro;

		// if (JSON.stringify(lanches).includes(lanche.nome)) {
		// 	await updateLanche(lanche, "localdb");
		// 	res.sendStatus(200);
		// } else {
		// 	res.status(404).send("Não encontrado");
		// }
	} catch (e) {
		console.error(e);
		res.status(500).send("Não foi possível salvar");
	}
};

export const postLanches = async (req: Request, res: Response) => {
	try {
		const lanches = await lanchesRepository("localdb");
		const lanche = req.body as IOutro;

		let novosDados: Array<IOutro> = [];

		if (JSON.stringify(lanches).includes(lanche.nome)) {
			res.status(404).send("Dado já existe");
		} else {
			await insertLanche(lanche, "mongo");
			res.sendStatus(200);
		}
	} catch (e) {
		console.error(e);
		res.status(500).send("Não foi possível salvar");
	}
};
