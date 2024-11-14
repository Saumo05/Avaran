import express from "express";

import {
  getFilteredProducts,
  getProductDetalis,
} from "../../controllers/shop/products-controller.js";

const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetalis);

export default router;
