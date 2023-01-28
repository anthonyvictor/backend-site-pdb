import { Router } from "express";
import { db } from "../config/localDatabase";
import { getEnderecos } from "../services/enderecos.service";
import { removeAccents } from "../util/misc";

const EnderecosRoutes = Router();

EnderecosRoutes.get("/", getEnderecos);

// EnderecosRoutes.get("/", async (req, res) => {
// 	try {
// 		const addresses: Array<IAddress> = await db.getData("/enderecos");
// 		let taxa: number | undefined = 0;
// 		const cep = String(address).replace(/[^0-9]/, "");
// 		if (Number(cep)) {
// 			taxa = addresses.find(x => x.cep === cep)?.taxa;
// 		} else {
// 			const cleanedAddress = removeAccents(String(address))
// 				.toLowerCase()
// 				.replace(/[^a-zA-Z\s,]/g, "")
// 				.replace(/\s\s/g, " ")
// 				.replace(/^r /, "rua ")
// 				.replace(/^acesso /, "")
// 				.replace(/^lad /, "ladeira ")
// 				.replace(/^tv /, "travessa ")
// 				.replace(/^trav /, "travessa ")
// 				.replace(/^av /g, "avenida ")
// 				.replace(/^pc /g, "praça ")
// 				.replace(/^pç /g, "praça ")
// 				.replace(/\s\s/g, " ")
// 				.toUpperCase()
// 				.split(", ")[0];

// 			taxa =
// 				addresses.find(x => x.rua.includes(String(cleanedAddress)))?.taxa ?? 0;
// 		}

// 		res.send({ taxa: taxa ?? 0 });
// 	} catch (e: any) {
// 		console.error(e["message"]);
// 		res.send({ taxa: 0 });
// 	}
// });

export default EnderecosRoutes;
