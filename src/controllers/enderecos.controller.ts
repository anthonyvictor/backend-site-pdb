import { Request, Response } from "express";
import { IEndereco } from "../types/endereco";
import { Controller } from ".";
import { v4 as uuidv4 } from "uuid";
import { ITaxaGetDTO } from "../dtos/taxa/get";

export class EnderecosController extends Controller<IEndereco> {
  get = async (req: Request, res: Response) => {
    try {
      const data = await this.service.find(req.query as ITaxaGetDTO);
      res.json(data);
    } catch (e) {
      console.error(e);
      res.json({ message: "Error" });
    }
  };
  post = async (req: Request, res: Response) => {
    try {
      const id = uuidv4();
      const item = req.body as IEndereco;
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
      const item = req.body as IEndereco;
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
