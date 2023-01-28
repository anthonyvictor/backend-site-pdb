import express from "express";
import cors from "cors";
import routes from "./routes";
import { environments } from "./config/dotenv";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(environments.Port, () =>
	console.info(`✅ Server is running on port ${environments.Port}`),
);
