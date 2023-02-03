import { Request, Response } from "express";
import { IPizzaTamanho } from "../../types/pizza";
import { Controller } from "..";
import { v4 as uuidv4 } from "uuid";

export class TamanhosController extends Controller<IPizzaTamanho> {
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
      const id = uuidv4();
      const data = req.body as IPizzaTamanho;
      await this.service.create({ ...data, id });
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      res.status(500).send("Não foi possível salvar");
    }
  };
  patch = async (req: Request, res: Response) => {
    try {
      const id = req.query.id as string;
      const data = req.body as IPizzaTamanho;
      await this.service.update(id, data);
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      res.status(500).send("Não foi possível salvar");
    }
  };
  delete = async (req: Request, res: Response) => {
    try {
      const id = req.query.id as string;
      await this.service.delete(id);
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      res.status(500).send("Não foi possível salvar");
    }
  };
}
