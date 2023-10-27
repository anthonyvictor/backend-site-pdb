import { Request, Response } from "express";
import { Controller } from ".";
import { v4 as uuidv4 } from "uuid";
import { ILojaGetDTO } from "../dtos/loja/get";
import { ILoja } from "../types/loja";

export class LojaController extends Controller<ILoja> {
  get = async (req: Request, res: Response) => {
    try {
      const data = await this.service.find(req.query as ILojaGetDTO);
      res.json(data);
    } catch (e) {
      console.error(e);
      res.json({ message: "Error" });
    }
  };
  post = async (req: Request, res: Response) => {
    try {
      const id = uuidv4();
      const item = req.body as ILoja;
      const result = await this.service.create({ ...item, id });
      res.json(result);
    } catch (e) {
      console.error(e);
      res.status(500).send("Não foi possível salvar");
    }
  };
  patch = async (req: Request, res: Response) => {
    try {
      const itemId = req.query.id as string;
      const item = req.body as ILoja;
      const result = await this.service.update(itemId, item);
      res.json(result);
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
