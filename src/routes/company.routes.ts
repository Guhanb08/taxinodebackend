import express from "express";

import {
  findAllCompanyController,
  findOneCompanyController,
  createCompanyController,
  updateCompanyController,
  deleteCompanyController,
} from "../controllers/company.controller";

import authMiddleware from "../middleware/userAuth";

const router = express.Router();

router.get("/", findAllCompanyController);
router.get("/:id", findOneCompanyController);
router.post("/", createCompanyController);
router.put("/:id", updateCompanyController);
router.delete("/:id", deleteCompanyController);

export default router;