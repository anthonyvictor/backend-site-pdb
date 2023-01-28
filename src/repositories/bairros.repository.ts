import { IBairro, IEndereco } from "../types/endereco";
import { arrayUnique } from "../util/filter";

export const bairrosRepository = async (
	from: "localdb" | "api",
	query?: string,
) => {
	let bairros: IBairro[] = [];

	try {
		if (from === "localdb") {
			const { db } = await import("../config/localDatabase");
			const enderecos = (await db.getData("/enderecos")) as IEndereco[];
			bairros = enderecos.map(e => e.bairro);
			bairros = arrayUnique("id", bairros);
		} else if (from === "api") {
			const { api } = await import("../config/api");
			const response = await api.get(`/enderecos${query && query}`);
		}
	} catch (err) {
		console.error("Error, failed to fetch!", (err as Error).message);
	}

	return bairros;
};
