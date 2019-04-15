import { Router } from "express";

import * as handlers from "./handlers";

const router = Router();

router
    .route("/")
    .get(handlers.getProducts)
    .post(handlers.createProduct);

router.route("/:id").get(handlers.getProductById).delete(handlers.deleteProduct);

export default router;
