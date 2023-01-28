import {
	Request as ExpressRequest,
	Response as ExpressResponse,
} from "express";

export interface Request extends ExpressRequest {}
export interface Response extends ExpressResponse {}

export interface BaseService {
	get: (req: Request, res: Response) => void;
	post?: (req: Request, res: Response) => void;
	patch?: (req: Request, res: Response) => void;
	delete?: (req: Request, res: Response) => void;
}
