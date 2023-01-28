import { Request, Response } from "express";
import { enderecosRepository } from "../repositories/enderecos.repository";
import { IEndereco } from "../types/endereco";

export const getEnderecos = async (req: Request, res: Response) => {
	try {
		const { cep } = req.query as { cep?: string };
		let enderecos: IEndereco[] = [];
		enderecos = (await enderecosRepository("localdb"))
			.sort((a, b) => (a.rua > b.rua ? 1 : -1))
			.sort((a, b) => (a.taxa > b.taxa ? 1 : -1));

		if (cep)
			enderecos = enderecos.filter(e => e.cep === cep.replace(/[^0-9]/g, ""));

		res.json({ enderecos });
	} catch (e: any) {
		console.error(e["message"]);
		res.send({ taxa: 0 });
	}
};
