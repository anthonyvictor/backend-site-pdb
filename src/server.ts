import express from "express";
import cors from "cors";
import routes from "./routes";
import { environments } from "./config/dotenv";
import { Cache } from "./cache";
import { connectToMongoDb } from "./infra/config";

const app = express();

app.use(express.json());
app.use(cors());

connectToMongoDb()
  .then(() => {
    console.info("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err.message, "❌ Failed to connect to MongoDB");
  });

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
