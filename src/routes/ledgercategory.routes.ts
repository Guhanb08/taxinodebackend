import express from "express";

import {
  findAllLedgercategoryController,
  findOneLedgercategoryController,
  createLedgercategoryController,
  updateLedgercategoryController,
  deleteLedgercategoryController,
} from "../controllers/ledgercategory.controller";

import authMiddleware from "../middleware/userAuth";

const router = express.Router();

router.get("/",  findAllLedgercategoryController);
router.get("/:id",  findOneLedgercategoryController);
router.post("/",  createLedgercategoryController);
router.put("/:id",  updateLedgercategoryController);
router.delete("/:id",  deleteLedgercategoryController);

export default router;
