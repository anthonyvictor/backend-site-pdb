import { Request, Response } from "express";

export const getAuth = async (req: Request, res: Response) => {
	try {
		let { pw } = req.body;
		if (!pw) throw new Error("Invalid password");
		pw = Buffer.from(pw).toString("ascii");
		if (pw === process.env.CONFIG_PASSWORD) {
			res.sendStatus(200);
		}
	} catch (e: any) {
		console.error(e["message"]);
		res.status(500).send({ message: "Invalid password" });
	}
};
