import { IGetDTO } from "..";

export interface ISaboresGetDTO extends IGetDTO {
  id?: string;
  gruposProcurados?: string;
  somenteSabores?: boolean;
  index?: number;
  length?: number;
}
