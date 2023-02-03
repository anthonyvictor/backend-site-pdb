import { Request, Response } from "express";
import { IOutro } from "../types/outro";
import { Controller } from ".";
import { randomUUID } from "node:crypto";

export class BebidasController extends Controller<IOutro> {
	get = async (req: Request, res: Response) => {
		try {
			const data = await this.service.find();
			res.json(data);
		} catch (e) {
			console.error(e);
			res.json({ message: "Error" });
		}
	};
	post = async (req: Request, res: Response) => {
		try {
			const id = randomUUID();
			const item = req.body as IOutro;
			await this.service.create({ ...item, id });
			res.sendStatus(200);
		} catch (e) {
			console.error(e);
			res.status(500).send("Não foi possível salvar");
		}
	};
	patch = async (req: Request, res: Response) => {
		try {
			const itemId = req.query.id as string;
			const item = req.body as IOutro;
			await this.service.update(itemId, item);
			res.sendStatus(200);
		} catch (e) {
			console.error(e);
			res.status(500).send("Não foi possível salvar");
		}
	};
	delete = async (req: Request, res: Response) => {
		try {
			const itemId = req.query.id as string;
			await this.service.delete(itemId);
			res.sendStatus(200);
		} catch (e) {
			console.error(e);
			res.status(500).send("Não foi possível salvar");
		}
	};
}
