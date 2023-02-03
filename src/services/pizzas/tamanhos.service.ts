import { Service } from "..";
import { IPizzaTamanho } from "../../types/pizza";
import { randomUUID } from "node:crypto";

export class TamanhosService extends Service<IPizzaTamanho> {
	async find() {
		const data = await ((await this.repo.find()) as IPizzaTamanho[]).sort(
			(a, b) => (a.tamanhoAprox > b.tamanhoAprox ? 1 : -1),
		);
		return data;
	}
	async create(item: IPizzaTamanho) {
		const id = randomUUID();
		await this.repo.create({ ...item, id });
	}
	async update(itemId: string, item: IPizzaTamanho) {
		await this.repo.update(itemId, item);
	}
	async delete(itemId: string) {
		await this.repo.delete(itemId);
	}
}
