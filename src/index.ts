// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { registerControllers } from "./utils";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

registerControllers(app);

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});