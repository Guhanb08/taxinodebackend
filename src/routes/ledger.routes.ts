import express from "express";

import {
  findAllLedgerController,
  findOneLedgerController,
  createLedgerController,
  deleteLedgerController,
  ledgerReportController,
  ledgerChartController
} from "../controllers/ledger.controller";

import authMiddleware from "../middleware/userAuth";

const router = express.Router();

router.get("/", findAllLedgerController);
router.get("/:id", findOneLedgerController);
router.get("/dashboard/report", ledgerReportController);
router.get("/dashboard/chart", ledgerChartController);
router.post("/", createLedgerController);
router.delete("/:id", deleteLedgerController);

export default router;
