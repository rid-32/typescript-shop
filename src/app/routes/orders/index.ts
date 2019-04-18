import express = require("express");

import * as handlers from "./handlers";

const router = express.Router();

router
    .route("/")
    .get(handlers.getOrders)
    .post(handlers.createOrder);

router
    .route("/:id")
    .get(handlers.getOrderById)
    .delete(handlers.deleteOrder);

export default router;
