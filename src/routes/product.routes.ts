import express from "express";

import {
  findAllProductController,
  findOneProductController,
  createProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller";

import authMiddleware from "../middleware/userAuth";

const router = express.Router();

router.get("/",  findAllProductController);
router.get("/:id",  findOneProductController);
router.post("/",  createProductController);
router.put("/:id",  updateProductController);
router.delete("/:id",  deleteProductController);

export default router;
