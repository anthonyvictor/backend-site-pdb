import { IOutro } from "../types/outro";
import { Service } from ".";
import { randomUUID } from "node:crypto";
import { Repo } from "../repositories";

export class BebidasService extends Service<IOutro> {
	constructor(repo: Repo<IOutro>) {
		super(repo);
	}
	async find(): Promise<IOutro[]> {
		const data = ((await this.repo.find()) as IOutro[]).sort((a, b) =>
			a.nome > b.nome ? 1 : -1,
		);
		return data;
	}

	async create(item: IOutro) {
		const id = randomUUID();
		await this.repo.create({ ...item, id });
	}
	async update(itemId: string, item: IOutro) {
		await this.repo.update(itemId, item);
	}
	async delete(itemId: string) {
		await this.repo.delete(itemId);
	}
}
