import { IHorario } from "../types/horario";
import { Service } from ".";
import { v4 as uuidv4 } from "uuid";
export class HorariosService extends Service<IHorario> {
  create(item: IHorario): void {
    throw new Error("Method not implemented.");
  }
  update(itemId: string, item: IHorario): void {
    throw new Error("Method not implemented.");
  }
  delete(itemId: string): void {
    throw new Error("Method not implemented.");
  }
  async find(): Promise<IHorario[]> {
    const data = (await this.repo.find()) as IHorario[];

    return data;
  }
}
