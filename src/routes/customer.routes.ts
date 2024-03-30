import express from "express";

import {
  findAllCustomerController,
  findOneCustomerController,
  createCustomerController,
  updateCustomerController,
  deleteCustomerController,
} from "../controllers/customer.controller";

import authMiddleware from "../middleware/userAuth";

const router = express.Router();

router.get("/", findAllCustomerController);
router.get("/:id", findOneCustomerController);
router.post("/", createCustomerController);
router.put("/:id", updateCustomerController);
router.delete("/:id", deleteCustomerController);

export default router;
