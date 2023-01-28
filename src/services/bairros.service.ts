import { Request, Response } from "express";
import { bairrosRepository } from "../repositories/bairros.repository";
import { IBairro, IEndereco } from "../types/endereco";

export const getBairros = async (req: Request, res: Response) => {
	try {
		let bairros: IBairro[] = [];
		bairros = (await bairrosRepository("localdb")).sort((a, b) =>
			a.nome > b.nome ? 1 : -1,
		);

		res.json({ bairros });
	} catch (e: any) {
		console.error(e["message"]);
		res.send({ taxa: 0 });
	}
};
