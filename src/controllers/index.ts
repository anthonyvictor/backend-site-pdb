import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { Repo } from "../repositories";
import { Service } from "../services";

interface Response extends ExpressResponse {}
interface Request extends ExpressRequest {}

export abstract class Controller<T> {
  constructor(protected service: Service<T>) {}
  abstract get: (req: Request, res: Response) => void;
  abstract post: (req: Request, res: Response) => void;
  abstract patch: (req: Request, res: Response) => void;
  abstract delete: (req: Request, res: Response) => void;
}
