import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as config from "config";
import * as morgan from "morgan";

import { products as productsRoutes, orders as ordersRoutes } from "./routes";

const NODE_ENV = config.get("NODE_ENV");
const app = express();

// set up logger
if (NODE_ENV !== "test") {
    if (NODE_ENV === "development") {
        app.use(morgan("dev"));
    } else {
        app.use(morgan("combined"));
    }
}

// parsing request body
app.use(express.urlencoded());
app.use(express.json());

// handling CORS
app.use(
    (req: Request, res: Response, next: NextFunction): any => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );

        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

            return res.status(200).json();
        }

        next();
    }
);

app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);

// handle not found route
app.use(
    (req: Request, res: Response, next: NextFunction): void => {
        const error = new Error("Not Found");

        error["status"] = 404;

        next(error);
    }
);

// handle errors
app.use(
    (err, req: Request, res: Response, next: NextFunction): void => {
        res.status(err.status || 500).json();
    }
);

export default app;
