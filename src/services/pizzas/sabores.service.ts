import { Service } from "..";
import { IPizzaGrupo, IPizzaSabor } from "../../types/pizza";
import { randomUUID } from "node:crypto";
import { Repo } from "../../repositories";
import {
	sortFlavoursByMidValue,
	sortFlavoursByName,
	sortGroupsByFlavoursLength,
	sortGroupsByMidValue,
} from "../../util/services/sabores.util";
export class SaboresService extends Service<IPizzaSabor> {
	constructor(repo: Repo<IPizzaSabor>, private GruposRepo: Repo<IPizzaGrupo>) {
		super(repo);
	}

	async find() {
		const grupos = (await this.GruposRepo.find()) as IPizzaGrupo[];
		const sabores = (await this.repo.find()) as IPizzaSabor[];
		return grupos
			.map(g => ({
				...g,
				sabores: sabores
					.filter(s => s.grupoId === g.id)
					.sort(sortFlavoursByName)
					.sort(sortFlavoursByMidValue),
			}))
			.sort(sortGroupsByFlavoursLength)
			.sort(sortGroupsByMidValue);
	}
	async create(item: IPizzaSabor) {
		const id = randomUUID();
		await this.repo.create({ ...item, id });
	}
	async update(itemId: string, item: IPizzaSabor) {
		await this.repo.update(itemId, item);
	}
	async delete(itemId: string) {
		await this.repo.delete(itemId);
	}
}
