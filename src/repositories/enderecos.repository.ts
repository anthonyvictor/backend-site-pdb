import { IEndereco } from "../types/endereco";

export const enderecosRepository = async (
	from: "localdb" | "api",
	query?: string,
) => {
	let addresses: IEndereco[] = [];

	try {
		if (from === "localdb") {
			const { db } = await import("../config/localDatabase");
			addresses = (await db.getData("/enderecos")) as IEndereco[];
		} else if (from === "api") {
			const { api } = await import("../config/api");
			const response = await api.get(`/enderecos${query && query}`);
		}
	} catch (err) {
		console.error("Error, failed to fetch!", (err as Error).message);
	}

	return addresses;
};
