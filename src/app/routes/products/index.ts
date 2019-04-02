import { Router } from "express";

import * as handlers from "./handlers";

const router = Router();

router.route("/").get(handlers.getProducts);

export default router;
