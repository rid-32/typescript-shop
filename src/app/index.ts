import * as express from "express";

import { products as productsRoutes } from "./routes";

const app = express();

app.get("/", productsRoutes);

export default app;
