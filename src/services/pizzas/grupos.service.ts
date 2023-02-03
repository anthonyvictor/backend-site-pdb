import { IPizzaGrupo } from "../../types/pizza";
import { Service } from "..";
import { randomUUID } from "node:crypto";

export class GruposService extends Service<IPizzaGrupo> {
	async find(): Promise<IPizzaGrupo[]> {
		const data = ((await this.repo.find()) as IPizzaGrupo[]).sort((a, b) =>
			a.nome > b.nome ? 1 : -1,
		);

		return data;
	}

	async create(item: IPizzaGrupo) {
		const id = randomUUID();
		await this.repo.create({ ...item, id });
	}
	async update(itemId: string, item: IPizzaGrupo) {
		await this.repo.update(itemId, item);
	}
	async delete(itemId: string) {
		await this.repo.delete(itemId);
	}
}
