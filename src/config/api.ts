import axios from "axios";
import { environments } from "./dotenv";

export const api = axios.create({
  baseURL: environments.apiURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: Buffer.from(environments.apiKey).toString("base64"),
  },
});
