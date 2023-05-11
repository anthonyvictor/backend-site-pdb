import { Request, Response } from "express";
import { IHorario } from "../types/horario";
import { Controller } from ".";
import { v4 as uuidv4 } from "uuid";
import { IHorariosGetDTO } from "../dtos/horarios/get";

export class HorariosController extends Controller<IHorario> {
  post: (req: Request, res: Response) => void;
  patch: (req: Request, res: Response) => void;
  delete: (req: Request, res: Response) => void;
  get = async (req: Request, res: Response) => {
    try {
      const data = await this.service.find(req.query as IHorariosGetDTO);
      res.json(data);
    } catch (e) {
      console.error(e);
      res.json({ message: "Error" });
    }
  };
}
