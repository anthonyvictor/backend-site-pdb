import axios from "axios";
import { Lanche } from "../models/Lanche";
import { IOutro } from "../types/outro";

export const lanchesRepository = async (
	from: "localdb" | "api",
	query?: string,
) => {
	let lanches: IOutro[] = [];

	try {
		if (from === "localdb") {
			const { db } = await import("../config/localDatabase");
			lanches = (await db.getData("/lanches")) as IOutro[];
		} else if (from === "api") {
			const { api } = await import("../config/api");
			const response = await api.get(`/lanches${query && query}`);
		} else if (from === "mongo") {
			// const getMongoConnection = await import("../config/mongoDatabase");
			// const conn = await getMongoConnection();
			// conn.console.log(result);
			const { data } = await axios.get("https://www.jsonkeeper.com/b/K32L", {
				headers: { "Content-type": "application/json" },
			});
			console.log(data);
			lanches = [{ disponivel: true, imagemUrl: "", nome: "a", valor: 1 }];
		}
	} catch (err) {
		console.error("Error, failed to fetch!", (err as Error).message);
	}

	return lanches;
};

export const updateLanche = async (lanche: IOutro, from: "localdb" | "api") => {
	if (from == "localdb") {
		const { db } = await import("../config/localDatabase");
		const lanches = await lanchesRepository("localdb");

		let novosLanches: Array<IOutro> = [];

		if (JSON.stringify(lanches).includes(lanche.nome)) {
			novosLanches = (lanches as Array<IOutro>).map(x =>
				x.nome.toUpperCase() === lanche.nome.toUpperCase() ? lanche : x,
			);
			await db.push("/lanches", novosLanches);
			return true;
		} else {
			throw new Error("Não encontrado");
		}
	} else {
		throw new Error("Falha ao procurar dado solicitado");
	}
};

export const insertLanche = async (lanche: IOutro, from: "localdb" | "api") => {
	if (from == "localdb") {
		const { db } = await import("../config/localDatabase");
		const lanches = await lanchesRepository("localdb");

		let novosLanches: Array<IOutro> = lanches;

		const lancheEncontrado = lanches.find(
			y => y.nome.toUpperCase() === lanche.nome.toUpperCase(),
		);

		if (lancheEncontrado) {
			throw new Error("Dado já existe");
		} else {
			novosLanches.push(lanche);
		}
		await db.push("/pizzas/lanches", novosLanches);
	} else if (from === "mongo") {
		const result = await Lanche.create({
			disponivel: true,
			nome: "Coca Cola 1L",
			valor: 5.5,
			imagemUrl:
				"https://us-southeast-1.linodeobjects.com/storage/serraverdehortifruti/media/uploads/produto/coca_lata_65c011f3-8722-4938-85ce-43b5be9f70b8.png",
		});
		// const lanche = new Lanche({
		// 	disponivel: true,
		// 	nome: "Coca Cola 1L",
		// 	valor: 5.5,
		// 	imagemUrl:
		// 		"https://us-southeast-1.linodeobjects.com/storage/serraverdehortifruti/media/uploads/produto/coca_lata_65c011f3-8722-4938-85ce-43b5be9f70b8.png",
		// });
		// const result = lanche.save();
		console.log(result);
	} else {
		throw new Error("Falha ao procurar dado solicitado");
	}
};
