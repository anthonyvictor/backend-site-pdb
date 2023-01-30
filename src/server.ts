import express from "express";
import cors from "cors";
import routes from "./routes";
import { environments } from "./config/dotenv";
import { Cache } from "./cache";

const app = express();

app.use(express.json());
app.use(cors());

const buildServer = async () => {
	try {
		app.use("/", routes);
		app.listen(environments.Port, () => {
			console.info(`✅ Server is running on port ${environments.Port}`);
		});
	} catch (e) {
		console.error((e as Error).message, (e as Error).stack);
	}
};

export const cache = new Cache();

buildServer();
