import { Router } from "express";

import * as handlers from "./handlers";

const router = Router();

router
    .route("/")
    .get(handlers.getOrders)
    .post(handlers.createOrder);

router
    .route("/:id")
    .get(handlers.getOrderById)
    .delete(handlers.deleteOrder);

export default router;
