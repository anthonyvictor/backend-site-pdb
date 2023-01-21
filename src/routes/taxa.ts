import { Router } from "express";
import { db } from "../config/database";
import axios from "axios";

const TaxaRoutes = Router();

TaxaRoutes.get("/", async (req, res) => {
	try {
		const { address } = req.query;
		const cleanedAddress = String(address)
			.toLowerCase()
			.replace("rua ", "")
			.split(" ")
			.slice(0, 3)
			.join(" ")
			.replace(/[^a-zA-Z\s]]/g, "");
		console.info(address);
		const response = await axios.get(
			`https://viacep.com.br/ws/BA/Salvador/${address}/json/`,
		);
		// const dados = await db.getData("/bebidas");
		// res.send({ bebidas: dados });
		res.send({ taxa: 5 });
	} catch (e: any) {
		console.error(e["message"]);
		res.send({ taxa: 7 });
	}
});

export interface ICoordinate {
	lat: number;
	lng: number;
}

export const getLinearDistanceInMetters = (
	startPoint: ICoordinate,
	endPoint: ICoordinate,
) => {
	const deg2rad = (deg: number) => deg * (Math.PI / 180),
		R = 6371,
		dLat = deg2rad(startPoint.lat - endPoint.lat),
		dLng = deg2rad(startPoint.lng - endPoint.lng),
		a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(startPoint.lat)) *
				Math.cos(deg2rad(startPoint.lat)) *
				Math.sin(dLng / 2) *
				Math.sin(dLng / 2),
		c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return R * c * 1000;
};

export default TaxaRoutes;
