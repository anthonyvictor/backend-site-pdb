import { IGetDTO } from "..";

export interface ISaboresGetDTO extends IGetDTO {
  id?: string;
  gruposProcurados?: string;
  somenteSabores?: boolean;
  promocionais?: boolean;
  index?: number;
  length?: number;
}
