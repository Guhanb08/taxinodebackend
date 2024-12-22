import express from "express";

import {
  findAllLedgerController,
  findOneLedgerController,
  createLedgerController,
  deleteLedgerController,
  ledgerReportController,
  ledgerChartController,
  updateLedgerController
} from "../controllers/ledger.controller";

import authMiddleware from "../middleware/userAuth";
import { updateLedger } from "services/ledger.services";

const router = express.Router();

router.get("/", findAllLedgerController);
router.get("/:id", findOneLedgerController);
router.get("/dashboard/report", ledgerReportController);
router.get("/dashboard/chart", ledgerChartController);
router.post("/", createLedgerController);
router.put("/:id",  updateLedgerController);
router.delete("/:id", deleteLedgerController);

export default router;
