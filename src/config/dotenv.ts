import { config } from "dotenv";
import path from "path";

config({
  path: path.join(__dirname, "..", "..", ".env"),
});

export const environments = {
  Port: process.env.APP_PORT as unknown as number,
  apiURL: process.env.API_URL as string,
  apiKey: process.env.API_KEY as string,
};
