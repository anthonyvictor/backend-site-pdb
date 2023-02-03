import { IGetDTO } from "..";

export interface ITaxaGetDTO extends IGetDTO {
	street?: string;
	number?: number;
	cep?: string;
	place?: string;
	reference?: string;
	neighbourhood?: number;
}
