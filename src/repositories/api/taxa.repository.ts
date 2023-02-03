import { Repo } from "..";
import { api } from "../../config/api";

export class TaxaRepoApi extends Repo<number> {
	async find(): Promise<number> {
		return (await api.get("/taxa")).data as number;
	}
	async create(item: number) {}
	async update(id: string, item: number) {}
	async delete(id: string) {}
}
