import express from "express";

import {
  findAllBranchController,
  findOneBranchController,
  createBranchController,
  updateBranchController,
  deleteBranchController,
} from "../controllers/branch.controller";

import authMiddleware from "../middleware/userAuth";

const router = express.Router();

router.get("/",  findAllBranchController);
router.get("/:id",  findOneBranchController);
router.post("/",  createBranchController);
router.put("/:id",  updateBranchController);
router.delete("/:id",  deleteBranchController);

export default router;
