import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as config from "config";
import * as morgan from "morgan";

import { products as productsRoutes, orders as ordersRoutes } from "./routes";

const NODE_ENV = config.get("NODE_ENV");
const app = express();

if (NODE_ENV !== "test") {
    if (NODE_ENV === "development") {
        app.use(morgan("dev"));
    } else {
        app.use(morgan("combined"));
    }
}

app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);

app.use(
    (req: Request, res: Response, next: NextFunction): void => {
        const error = new Error("Not Found");

        error["status"] = 404;

        next(error);
    }
);

app.use(
    (err, req: Request, res: Response, next: NextFunction): void => {
        res.status(err.status || 500).json({
            message: err.message
        });
    }
);

export default app;
