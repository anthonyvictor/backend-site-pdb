import { IBairro, IEndereco } from "../types/endereco";
import { Service } from ".";
import { randomUUID } from "node:crypto";
import { Repo } from "../repositories";
import { IBairrosGetDTO } from "../dtos/bairros/get";

export class BairrosService extends Service<IBairro> {
	async find({ id }: IBairrosGetDTO): Promise<IBairro[]> {
		const data = ((await this.repo.find()) as IBairro[])
			.filter(e => (id ? e.id === id : true))
			.sort((a, b) => (a.nome > b.nome ? 1 : -1));
		return data;
	}

	async create(item: IBairro) {
		const id = randomUUID();
		await this.repo.create({ ...item, id });
	}
	async update(itemId: string, item: IBairro) {
		await this.repo.update(itemId, item);
	}
	async delete(itemId: string) {
		await this.repo.delete(itemId);
	}
}
