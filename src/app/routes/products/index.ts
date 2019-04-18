import express = require("express");

import * as handlers from "./handlers";

const router = express.Router();

router
    .route("/")
    .get(handlers.getProducts)
    .post(handlers.createProduct);

router
    .route("/:id")
    .get(handlers.getProductById)
    .delete(handlers.deleteProduct);

export default router;
